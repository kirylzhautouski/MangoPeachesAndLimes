from rest_framework import serializers

from coctailsapi.models import Drink, Ingredient


class DrinkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Drink
        fields = ['url', 'id', 'name', 'is_alcoholic', 'image_url', 'instructions']


class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['url', 'id', 'name', 'description', 'is_alcoholic']
