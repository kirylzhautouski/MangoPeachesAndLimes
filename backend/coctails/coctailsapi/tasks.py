from celery.decorators import periodic_task
from celery.task.schedules import crontab
from django.core.management import call_command


# executes daily at midnight
@periodic_task(run_every=(crontab(minute=0, hour=0)))
def load_data_periodic():
    call_command('loaddata')


# executes every minute
@periodic_task(run_every=(crontab()))
def hello():
    print('Hello from Celery')
