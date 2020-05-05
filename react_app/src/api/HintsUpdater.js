export class NotLatestResult extends Error {
    constructor(message = '', ...args) {
        super(message, ...args);
        this.message = message + ' hints results are not the latest ones.';
    }
}

export default class HintsUpdater {

    // undefined value means no query in cache, null means query is pending, and other value is real value
    queriesCache = new Map();

    queryRequestTimestamps = new Map();
    
    _findLater(input) {
        const laterQueries = [];

        this.queryRequestTimestamps.forEach((value, key, m) => {
            if (value.getTime() > m.get(input).getTime()) {
                laterQueries.push(key);
            }
        });

        return laterQueries;
    }

    _isLatestPossible(input) {
        const laterQueries = this._findLater(input);

        for (const laterQuery of laterQueries) {
            if (this.queriesCache.get(laterQuery) !== undefined && this.queriesCache.get(laterQuery) !== null) {
                return false;
            }
        }

        return true;
    }

    async _loadValue(input, loader) {
        this.queriesCache.set(input, null); // means that request is pending

        const results = await loader(input);        
        this.queriesCache.set(input, results);

        if (this._isLatestPossible(input)) {
            return results;
        } else {
            throw NotLatestResult();
        }
    }

    async search(input, loader) {
        if (input.length === 0) {
            return [];
        }

        this.queryRequestTimestamps.set(input, new Date());

        if (this.queriesCache.get(input) !== undefined && this.queriesCache.get(input) !== null) {
            return this.queriesCache.get(input);
        } else {
            if (this.queriesCache.get(input) === undefined) {
                return this._loadValue(input, loader);
            }
        }
    }
}