import React from 'react';

import Drink from '../common/Drink.js';
import Ingredient from '../common/Ingredient.js';

export function createDrinksCards(drinks) {
    return drinks.map((value) => {
        const ingredientNames = value.measures.map((measureValue) => measureValue.ingredient_name);

        return <Drink 
                    key={value.id}
                    id={value.id}
                    name={value.name}
                    drinkImage={value.image_url}
                    isAlcoholic={value.is_alcoholic} 
                    ingredientNames={ingredientNames} 
                />
    });
}

export function createIngredientsCards(ingredients) {
    console.log(ingredients);
    return ingredients.map((value) => {
        console.log(value.image_url)

        return <Ingredient
                    key={value.id}
                    id={value.id}
                    name={value.name}
                    ingredientImage={value.image_url}
                    isAlcoholic={value.is_alcoholic}
                    description={value.description}
                />
    })
}