import React from 'react';

import Drink from '../common/Drink.js';
import Ingredient from '../common/Ingredient.js';

export function createDrinkCard(drink) {
    const ingredientNames = drink.measures.map((measureValue) => measureValue.ingredient_name);

    return <Drink 
                key={drink.id}
                id={drink.id}
                name={drink.name}
                drinkImage={drink.image_url}
                isAlcoholic={drink.is_alcoholic} 
                ingredientNames={ingredientNames} 
                /> 
}

export function createDrinksCards(drinks) {
    return drinks.map((value) => {
        return createDrinkCard(value);
    });
}

export function createIngredientsCards(ingredients) {
    return ingredients.map((value) => {
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