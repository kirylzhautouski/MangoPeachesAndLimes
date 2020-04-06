from rest_framework import viewsets

from coctailsapi.models import Drink, Ingredient
from coctailsapi.serializers import DrinkSerializer, IngredientSerializer


class DrinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
