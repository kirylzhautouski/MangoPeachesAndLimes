**Create containers, apply db migrations and start app:**

`docker-compose up`

`docker exec -it <web_container_id> python coctails/manage.py migrate`

`docker-compose restart`

**Start app:**

`docker-compose start`
