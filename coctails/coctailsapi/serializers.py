from rest_framework import serializers

from coctailsapi.models import Drink, Ingredient, Measure


class MeasureSerializer(serializers.ModelSerializer):

    ingredient = serializers.HyperlinkedRelatedField(view_name='coctailsapi:ingredient-detail',
                                                     queryset=Ingredient.objects.all())
    ingredient_name = serializers.ReadOnlyField(source='ingredient.name')

    class Meta:
        model = Measure
        fields = ['id', 'ingredient', 'ingredient_name', 'measure']


class DrinkSerializer(serializers.HyperlinkedModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name='coctailsapi:drink-detail')
    measures = MeasureSerializer(many=True)

    class Meta:
        model = Drink
        fields = ['url', 'id', 'name', 'is_alcoholic', 'image_url', 'instructions', 'measures']


class IngredientSerializer(serializers.HyperlinkedModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name='coctailsapi:ingredient-detail')

    class Meta:
        model = Ingredient
        fields = ['url', 'id', 'name', 'description', 'is_alcoholic']
