from rest_framework import serializers

from coctailsapi.models import Ingredient


class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['url', 'id', 'name', 'description', 'is_alcoholic']
