from rest_framework import serializers

from coctailsapi.models import Drink, Ingredient, Measure


class MeasureSerializer(serializers.ModelSerializer):

    ingredient = serializers.HyperlinkedRelatedField(view_name='coctailsapi:ingredient-detail',
                                                     queryset=Ingredient.objects.all())
    ingredient_name = serializers.ReadOnlyField(source='ingredient.name')
    ingredient_id = serializers.ReadOnlyField(source='ingredient.id')

    class Meta:
        model = Measure
        fields = ['id', 'ingredient', 'ingredient_name', 'ingredient_id', 'measure']


class DrinkSerializer(serializers.HyperlinkedModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name='coctailsapi:drink-detail')
    measures = MeasureSerializer(many=True)

    class Meta:
        model = Drink
        fields = ['url', 'id', 'name', 'is_alcoholic', 'image_url', 'instructions', 'measures']


class IngredientSerializer(serializers.HyperlinkedModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name='coctailsapi:ingredient-detail')
    image_url = serializers.URLField(source='get_image_url')

    class Meta:
        model = Ingredient
        fields = ['url', 'id', 'name', 'description', 'is_alcoholic', 'image_url']
