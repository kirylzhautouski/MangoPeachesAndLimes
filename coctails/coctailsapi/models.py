from django.db import models


class Drink(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_alcoholic = models.BooleanField(default=False)
    image_url = models.URLField(blank=True)
    instructions = models.TextField(blank=True)

    class Meta:
        ordering = ('name',)


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_alcoholic = models.BooleanField(default=False)


class Measure(models.Model):
    drink = models.ForeignKey(Drink, related_name='measures', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, related_name='measures', on_delete=models.CASCADE)
    measure = models.CharField(max_length=50, blank=True)

    class Meta:
        unique_together = ('drink', 'ingredient',)
