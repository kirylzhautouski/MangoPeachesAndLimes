import aiohttp
import asyncio
import json

from asgiref.sync import sync_to_async
from django.core.management.base import BaseCommand

from coctailsapi.models import Drink


class Command(BaseCommand):
    help = 'Loads and updates data from TheCoctailDB into the local database'

    @sync_to_async
    def __update_db(self, loaded_drinks):
        for loaded_drink in loaded_drinks:
            defaults = {
                'is_alcoholic': True if loaded_drink['strAlcoholic'] == 'Alcoholic' else False,
                'image_url': loaded_drink['strDrinkThumb'] if loaded_drink['strDrinkThumb'] else '',
                'instructions': loaded_drink['strInstructions'] if loaded_drink['strInstructions'] else '',
            }
            Drink.objects.update_or_create(name=loaded_drink['strDrink'], defaults=defaults)

    async def __load_data(self):
        async with aiohttp.ClientSession() as session:
            for letter in 'abcdefghijklmnopqrstuvwxyz':
                async with session.get(f'https://www.thecocktaildb.com/api/json/v1/1/search.php?f={letter}') \
                        as response:
                    drinks = json.loads(await response.text())
                    if drinks['drinks']:
                        await self.__update_db(drinks['drinks'])

    def handle(self, *args, **kwargs):
        asyncio.get_event_loop().run_until_complete(self.__load_data())
        self.stdout.write(self.style.SUCCESS('Data was successfully loaded!'))
