**Create containers:**

`docker-compose up`

**Apply db migrations and start app:**

`docker-compose start`

`docker exec -it <web_container_id> python coctails/manage.py migrate`

`docker-compose restart`

**Start app:**

`docker-compose start`
