
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
        console.log(results)
        
        return results;
    }

    async loadDrinks(limit, offset) {
        return this._loadItems(CoctailsAPI._DRINKS_ENDPOINT, limit, offset);
    }

    async loadIngredients(limit, offset) {
        return this._loadItems(CoctailsAPI._INGREDIENTS_ENDPOINT, limit, offset);
    }

}

const coctailsAPI = new CoctailsAPI();
export default coctailsAPI;
