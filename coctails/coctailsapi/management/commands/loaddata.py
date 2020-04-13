import aiohttp
import asyncio
import json

from asgiref.sync import sync_to_async
from django.core.management.base import BaseCommand

from coctailsapi.models import Drink, Ingredient, Measure
from coctailsapi.helpers.similar_drinks_manager import SimilarDrinksManager


class Command(BaseCommand):
    help = 'Loads and updates data from TheCoctailDB into the local database'

    THECOCTAILDB_URL = 'https://www.thecocktaildb.com/api/json/v1/1/'

    def __update_ingredients(self):
        self.ingredients_db = {}
        for ingredient_name, ingredient in self.ingredients.items():
            defaults = {
                'is_alcoholic': True if ingredient['strAlcohol'] == 'Yes' else False,
                'description': ingredient['strDescription'] if ingredient['strDescription'] else '',
            }
            ingredient_db, _ = Ingredient.objects.update_or_create(name=ingredient['strIngredient'], defaults=defaults)
            self.ingredients_db[ingredient_name] = ingredient_db

    def __update_drinks(self):
        for drink in self.drinks:
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

                ingredient = self.ingredients_db[ingredient_name]
                measure = drink['strMeasure' + str(i)] if drink['strMeasure' + str(i)] else ''

                Measure.objects.update_or_create(drink=drink_db, ingredient=ingredient, defaults={
                    'measure': measure
                })

    @sync_to_async
    def __update_db(self):
        self.__update_ingredients()
        self.__update_drinks()

        SimilarDrinksManager.update()

    async def __load_coctails_for_drink(self, drink, session):
        for i in range(1, 16):
            ingredientKey = 'strIngredient' + str(i)
            ingredientName = drink[ingredientKey]

            if not ingredientName:
                break

            if ingredientName not in self.ingredients:
                async with session.get(f'{Command.THECOCTAILDB_URL}search.php?i={ingredientName}') \
                        as response:
                    result = json.loads(await response.text())
                    self.ingredients[ingredientName] = result['ingredients'][0]

    async def __load_for_letter(self, letter, session):
        self.stdout.write(f'Started downloading for letter {letter}')

        async with session.get(f'{Command.THECOCTAILDB_URL}search.php?f={letter}') \
                as response:
            loaded_drinks = json.loads(await response.text())
            loaded_drinks = loaded_drinks['drinks']

            if loaded_drinks:
                tasks = []
                for drink in loaded_drinks:
                    task = asyncio.ensure_future(self.__load_coctails_for_drink(drink, session))
                    tasks.append(task)
                await asyncio.gather(*tasks, return_exceptions=True)

                self.drinks.extend(loaded_drinks)

        self.stdout.write(f'Finished downloading for letter {letter}')

    async def __load_data(self):
        self.ingredients = {}
        self.drinks = []

        async with aiohttp.ClientSession() as session:
            tasks = []
            for letter in 'abcdefghijklmnopqrstuvwxyz':
                task = asyncio.ensure_future(self.__load_for_letter(letter, session))
                tasks.append(task)
            await asyncio.gather(*tasks, return_exceptions=True)

        await self.__update_db()

    def handle(self, *args, **kwargs):
        asyncio.get_event_loop().run_until_complete(self.__load_data())
        self.stdout.write(self.style.SUCCESS('Data was successfully loaded!'))
