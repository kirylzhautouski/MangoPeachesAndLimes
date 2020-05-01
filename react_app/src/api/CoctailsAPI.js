
class CoctailsAPI {

    static _API_URL = 'http://localhost:8000/api';

    static _DRINKS_ENDPOINT = '/drinks';
    static _INGREDIENTS_ENDPOINT = '/ingredients';

    async _loadItems(itemsEndpoint, limit, offset) {
        let urlString = `${CoctailsAPI._API_URL}${itemsEndpoint}/?format=json`;
        if (limit !== undefined) {
            urlString += `&limit=${limit}`;
        }
        if (offset !== undefined) {
            urlString += `&offset=${offset}`;
        }

        const url = new URL(urlString);

        const response = await fetch(url);
        const { results } = await response.json();
        
        return results;
    }

    async loadDrinks(limit, offset) {
        return this._loadItems(CoctailsAPI._DRINKS_ENDPOINT, limit, offset);
    }

    async loadIngredients(limit, offset) {
        return this._loadItems(CoctailsAPI._INGREDIENTS_ENDPOINT, limit, offset);
    }

    async _loadItem(itemEndpoint, itemId) {
        const urlString = `${CoctailsAPI._API_URL}${itemEndpoint}/${itemId}/?format=json`;
        const url = new URL(urlString);

        const response = await fetch(url);
        if (response.status === 404) {
            return null;
        }

        const result = await response.json();
        return result;
    }

    async loadDrink(drinkId) {
        return this._loadItem(CoctailsAPI._DRINKS_ENDPOINT, drinkId);
    }

    async loadIngredient(ingredientId) {
        return this._loadItem(CoctailsAPI._INGREDIENTS_ENDPOINT, ingredientId);
    }

    async loadSimilarDrinks(similarToId, n) {
        if (n === undefined) {
            n = 20;
        }

        const urlString = `${CoctailsAPI._API_URL}${CoctailsAPI._DRINKS_ENDPOINT}/${similarToId}/similar/?format=json&n=${n}`;
        const url = new URL(urlString);

        const response = await fetch(url);
        if (response.status === 404) {
            return null;
        }

        const result = await response.json();
        return result;
    }

}

const coctailsAPI = new CoctailsAPI();
export default coctailsAPI;
