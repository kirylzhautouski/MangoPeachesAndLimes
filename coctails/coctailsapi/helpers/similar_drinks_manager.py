import redis

from django.conf import settings


class SimilarDrinksManager:

    redis_client = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)

    @classmethod
    def update(cls):
        print(cls.redis_client)

    @classmethod
    def get_similar(cls):
        pass
