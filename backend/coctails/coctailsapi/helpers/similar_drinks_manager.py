import pickle
from collections import defaultdict

from coctailsapi.models import Drink
from coctailsapi.helpers.storage import Storage


class SimilarDrinksManager:

    @staticmethod
    def __build_similarity_dict():
        similarity_dict = defaultdict(list)

        drinks = list(Drink.objects.all())
        ingredients_for_drinks = {d.id: set(d.get_ingredient_ids()) for d in drinks}

        for i, di in enumerate(drinks):
            ingredientsi = ingredients_for_drinks[di.id]
            for j in range(i + 1, len(drinks)):
                dj = drinks[j]

                ingredientsj = ingredients_for_drinks[dj.id]
                similar_count = len(ingredientsi.intersection(ingredientsj))

                if similar_count != 0:
                    similarity_dict[di.id].append((dj.id, similar_count))
                    similarity_dict[dj.id].append((di.id, similar_count))

        for similaritites in similarity_dict.values():
            similaritites.sort(key=lambda x: -x[1])

        return similarity_dict

    @staticmethod
    def __get_key(drink_id):
        return f'drink:{drink_id}'

    @classmethod
    def update(cls):
        similarity_dict = cls.__build_similarity_dict()

        for drink_id, similaritites in similarity_dict.items():
            key = cls.__get_key(drink_id)
            pickled_similaritites = map(lambda x: pickle.dumps(x), similaritites)
            Storage.save_similaritites(key, pickled_similaritites)

        Storage.save_storage()

    @classmethod
    def get_similar(cls, drink_id, n=None):
        if n is None:
            n = 5

        key = cls.__get_key(drink_id)
        pickled_similaritites = Storage.get_similaritites(key, n)
        similar_drink_ids = list(map(lambda x: pickle.loads(x)[0], pickled_similaritites))

        return Drink.objects.filter(id__in=similar_drink_ids)
