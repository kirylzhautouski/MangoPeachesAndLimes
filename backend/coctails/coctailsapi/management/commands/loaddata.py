import asyncio

from asgiref.sync import sync_to_async
from django.core.management.base import BaseCommand

from coctailsapi.models import Drink, Ingredient, Measure
from coctailsapi.helpers.similar_drinks_manager import SimilarDrinksManager
from coctailsapi.helpers.thecoctaildb_api import TheCoctailDBAPI


class Command(BaseCommand):
    help = 'Loads and updates data from TheCoctailDB into the local database'

    def __update_ingredients(self, ingredients):
        ingredients_db = {}
        for ingredient_name, ingredient in ingredients.items():
            defaults = {
                'is_alcoholic': True if ingredient['strAlcohol'] == 'Yes' else False,
                'description': ingredient['strDescription'] if ingredient['strDescription'] else '',
            }
            ingredient_db, _ = Ingredient.objects.update_or_create(name=ingredient['strIngredient'], defaults=defaults)
            ingredients_db[ingredient_name] = ingredient_db
        return ingredients_db

    def __update_drinks(self, drinks, ingredients_db):
        for drink in drinks:
            defaults = {
                'is_alcoholic': True if drink['strAlcoholic'] == 'Alcoholic' else False,
                'image_url': drink['strDrinkThumb'] if drink['strDrinkThumb'] else '',
                'instructions': drink['strInstructions'] if drink['strInstructions'] else '',
            }
            drink_db, _ = Drink.objects.update_or_create(name=drink['strDrink'], defaults=defaults)

            for i in range(1, 16):
                ingredient_key = 'strIngredient' + str(i)
                ingredient_name = drink[ingredient_key]
                if not ingredient_name:
                    break

                ingredient = ingredients_db[ingredient_name]
                measure = drink['strMeasure' + str(i)] if drink['strMeasure' + str(i)] else ''

                Measure.objects.update_or_create(drink=drink_db, ingredient=ingredient, defaults={
                    'measure': measure
                })

    @sync_to_async
    def __update_db(self, ingredients, drinks):
        ingredients_db = self.__update_ingredients(ingredients)
        self.__update_drinks(drinks, ingredients_db)
        self.stdout.write('Database was updated.')

        SimilarDrinksManager.update()
        self.stdout.write('Similarity metrics were built.')

    async def __load_data(self):
        drinks_api = TheCoctailDBAPI()
        ingredients, drinks = await drinks_api.load_drinks()
        self.stdout.write('Data was downloaded from API.')

        await self.__update_db(ingredients, drinks)

    def handle(self, *args, **kwargs):
        asyncio.get_event_loop().run_until_complete(self.__load_data())
        self.stdout.write(self.style.SUCCESS('Data was successfully loaded!'))
