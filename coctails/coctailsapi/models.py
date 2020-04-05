from django.db import models


class Drink(models.Model):
    name = models.CharField(max_length=100, unique=True)  # think about null blank unique here
    is_alcoholic = models.BooleanField(default=False)
    image_url = models.URLField()

    # instruction string
    # list of measures


class Ingredient(models.Model):
    pass


class Measure(models.Model):
    # contains ingredient and a measure of it
    pass
