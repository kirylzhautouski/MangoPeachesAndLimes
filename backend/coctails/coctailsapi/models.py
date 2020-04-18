from django.db import models


class Drink(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_alcoholic = models.BooleanField(default=False)
    image_url = models.URLField(blank=True)
    instructions = models.TextField(blank=True)

    class Meta:
        ordering = ('name',)

    def get_ingredient_ids(self):
        return self.measures.values_list('ingredient', flat=True)

    def count_similar_ingredients(self, other):
        return self.get_ingredient_ids().intersection(other.get_ingredient_ids()).count()


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_alcoholic = models.BooleanField(default=False)

    def get_image_url(self):
        return f'https://www.thecocktaildb.com/images/ingredients/{self.name}-Medium.png'


class Measure(models.Model):
    drink = models.ForeignKey(Drink, related_name='measures', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, related_name='measures', on_delete=models.CASCADE)
    measure = models.CharField(max_length=50, blank=True)

    class Meta:
        unique_together = ('drink', 'ingredient',)
