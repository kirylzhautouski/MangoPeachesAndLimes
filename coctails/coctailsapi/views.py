import random

from django.http import Http404
from rest_framework import viewsets, generics, views, filters
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from coctailsapi.models import Drink, Ingredient
from coctailsapi.serializers import DrinkSerializer, IngredientSerializer


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

    def __filter_by_ingredients(self, queryset, ingredients):
        for ingredient in ingredients:
            if not Ingredient.objects.filter(id=ingredient).first():
                raise ValidationError(f'Ingredient with id {ingredient} does not exist.', code=400)

            queryset = queryset.filter(measures__ingredient__id=ingredient)

        return queryset

    def __filter_by_alcoholic(self, queryset, is_alcoholic):
        if is_alcoholic == 'True':
            queryset = queryset.filter(is_alcoholic=True)
        elif is_alcoholic == 'False':
            queryset = queryset.filter(is_alcoholic=False)
        else:
            raise ValidationError(f'Invalid value for alcoholic filter: {is_alcoholic}')

        return queryset

    def get_queryset(self):
        drinks_queryset = Drink.objects

        ingredients_string = self.request.query_params.get('ingredients')
        if ingredients_string:
            drinks_queryset = self.__filter_by_ingredients(drinks_queryset, ingredients_string.split(','))

        alcoholic_only_filter = self.request.query_params.get('alcoholic')
        if alcoholic_only_filter is not None:
            drinks_queryset = self.__filter_by_alcoholic(drinks_queryset, alcoholic_only_filter)

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
