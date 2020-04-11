import random

from django.http import Http404
from rest_framework import viewsets, generics, views, filters
from rest_framework.response import Response

from coctailsapi.models import Drink, Ingredient
from coctailsapi.serializers import DrinkSerializer, IngredientSerializer
from coctailsapi.helpers.filters import DrinkByAlcoholPresenceFilter, DrinkByIngredientsFilter


class DocsView(views.APIView):
    def get(self, request):
        apidocs = {
            'ingredients': request.build_absolute_uri('ingredients/'),
            'drinks': request.build_absolute_uri('drinks/'),
            'feeling-lucky': request.build_absolute_uri('feeling-lucky/'),
        }
        return Response(apidocs)


class DrinkViewSet(viewsets.ReadOnlyModelViewSet):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter, )
    serializer_class = DrinkSerializer

    filters = [DrinkByIngredientsFilter('ingredients'), DrinkByAlcoholPresenceFilter('alcoholic')]

    def get_queryset(self):
        drinks_queryset = Drink.objects

        for _filter in self.filters:
            drinks_queryset = _filter.filter(self.request, drinks_queryset)

        return drinks_queryset.all()


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter, )

    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RandomDrinkView(generics.RetrieveAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer

    def get_object(self):
        queryset = self.get_queryset()

        if queryset.count() == 0:
            raise Http404()

        ids = queryset.values_list('id', flat=True)
        pk = random.choice(ids)
        return queryset.get(pk=pk)
