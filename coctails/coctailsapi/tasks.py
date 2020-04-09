from celery.decorators import periodic_task
from celery.task.schedules import crontab


@periodic_task(run_every=(crontab()))
def hello():
    print("Hello from Celery!")
