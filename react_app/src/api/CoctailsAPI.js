
class CoctailsAPI {

    static _API_URL = 'http://localhost:8000/api';

    static _DRINKS_ENDPOINT = '/drinks';

    async loadDrinks(limit, offset) {
        let urlString = `${CoctailsAPI._API_URL}${CoctailsAPI._DRINKS_ENDPOINT}/?format=json`;
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

    async loadIngredients() {

    }

}

const coctailsAPI = new CoctailsAPI();
export default coctailsAPI;
