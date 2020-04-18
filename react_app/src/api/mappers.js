import React from 'react';
import Drink from '../common/Drink.js';

export default function createDrinksCards(drinks) {
    return drinks.map((value) => {
        const ingredientNames = value.measures.map((measureValue) => measureValue.ingredient_name);

        return <Drink 
                    key={value.id} 
                    name={value.name}
                    drinkImage={value.image_url}
                    isAlcoholic={value.is_alcoholic} 
                    ingredientNames={ingredientNames} 
                />
    });
}