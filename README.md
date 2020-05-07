# MangoPeachesAndLimes
My personal educational project that consists of the REST API built with Django and the web application on React.
API provides endpoints for retrieving random drink information, list of drinks, list of ingredients, drink and ingredient details, 
list of similar drinks to a particular drink. Endpoints are implemented using DRF. API supports pagination for getting list of items. All data is retrieved from TheCocktailDB.com
and saved to the database in a more convinient way. It is possible to update data using django-admin command `loaddata`, also Celery task is set 
to load and update data every midnight. When data is updated similarity metrics are counted and stored in the Redis storage for a faster access. 
Also searching and filtering through different list of items is available. Backend is containerized using Docker Compose, instructions for how to 
setup and launch it are in the appropriate folder. 

The frontend web application is built with React. React Router is used to implement navigation between pages. For the majority of visual items React Bootstrap is used.

_________________

**Technologies**:
  Django, DRF, Celery, Redis, aiohttp, Docker Compose, React

_________________

### Example screenshots

List of all drinks that are loaded by portions in a infinite manner:

![All drinks screenshot](/screenshots/drinks.png?raw=true)

Filters on the list of drinks:

![Drink filters screenshot](/screenshots/drink_filters.png?raw=true)

Search for a drink by its name:

![Searching drinks screenshot](/screenshots/searching_drinks.png?raw=true)

List of all ingredients that are loaded by portions in a infinite manner:

![Ingredients screenshot](/screenshots/ingredients.png?raw=true)

Search for an ingredient by its name:

![Searching ingredients screenshot](/screenshots/searching_ingredients.png?raw=true)

Random drink generator:

![Random drink screenshot](/screenshots/random_drink.png?raw=true)

Detail of a drink:

![Drink detail screenshot](/screenshots/drink_detail.png?raw=true)

Detail of an ingredient:

![Ingredient detail screenshot](/screenshots/ingredient_detail.png?raw=true)

DRF API docs:

![API docs screenshot](/screenshots/api_docs.png?raw=true)

Example of GET request to the drinks endpoint:

![API drinks screenshot](/screenshots/drinks_api.png?raw=true)

Example of GET request to the ingredients endpoint:

![API ingredients screenshot](/screenshots/ingredients_api.png?raw=true)
