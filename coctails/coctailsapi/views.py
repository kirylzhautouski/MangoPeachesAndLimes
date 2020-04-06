from rest_framework import viewsets

from coctailsapi.models import Ingredient
from coctailsapi.serializers import IngredientSerializer


class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
