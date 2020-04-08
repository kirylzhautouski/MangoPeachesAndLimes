import aiohttp
import asyncio
import json

from asgiref.sync import sync_to_async
from django.core.management.base import BaseCommand

from coctailsapi.models import Drink


class Command(BaseCommand):
    help = 'Loads and updates data from TheCoctailDB into the local database'

    THECOCTAILDB_URL = 'https://www.thecocktaildb.com/api/json/v1/1/'

    @sync_to_async
    def __update_db(self, loaded_drinks):
        for loaded_drink in loaded_drinks:
            defaults = {
                'is_alcoholic': True if loaded_drink['strAlcoholic'] == 'Alcoholic' else False,
                'image_url': loaded_drink['strDrinkThumb'] if loaded_drink['strDrinkThumb'] else '',
                'instructions': loaded_drink['strInstructions'] if loaded_drink['strInstructions'] else '',
            }
            Drink.objects.update_or_create(name=loaded_drink['strDrink'], defaults=defaults)

            # for i in range(1, 16):
            #     ingredientKey = 'strIngredient' + str(i)
            #     ingredient = loaded_drink[ingredientKey]
            #     if not ingredient:
            #         break

    async def __load_coctails_for_drink(self, drink, session):
        for i in range(1, 16):
            ingredientKey = 'strIngredient' + str(i)
            ingredientName = drink[ingredientKey]

            if not ingredientName:
                break

            if ingredientName not in self.cached_inredients:
                async with session.get(f'{Command.THECOCTAILDB_URL}search.php?i={ingredientName}') \
                        as response:
                    result = json.loads(await response.text())
                    self.inredients[ingredientName] = result['ingredients'][0]

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

        # TODO: save everything to the db

    def handle(self, *args, **kwargs):
        asyncio.get_event_loop().run_until_complete(self.__load_data())
        self.stdout.write(self.style.SUCCESS('Data was successfully loaded!'))
