import aiohttp
import asyncio
import json


class TheCoctailDBAPI:

    THECOCTAILDB_URL = 'https://www.thecocktaildb.com/api/json/v1/1/'

    async def __load_coctails_for_drink(self, drink, session):
        for i in range(1, 16):
            ingredientKey = 'strIngredient' + str(i)
            ingredientName = drink[ingredientKey]

            if not ingredientName:
                break

            if ingredientName not in self.ingredients:
                async with session.get(f'{TheCoctailDBAPI.THECOCTAILDB_URL}search.php?i={ingredientName}') \
                        as response:
                    result = json.loads(await response.text())
                    self.ingredients[ingredientName] = result['ingredients'][0]

    async def __load_for_letter(self, letter, session):
        async with session.get(f'{TheCoctailDBAPI.THECOCTAILDB_URL}search.php?f={letter}') \
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

    async def load_drinks(self):
        self.ingredients = {}
        self.drinks = []

        async with aiohttp.ClientSession() as session:
            tasks = []
            for letter in 'abcdefghijklmnopqrstuvwxyz':
                task = asyncio.ensure_future(self.__load_for_letter(letter, session))
                tasks.append(task)
            await asyncio.gather(*tasks, return_exceptions=True)

        return self.ingredients, self.drinks
