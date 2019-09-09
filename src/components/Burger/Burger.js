import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  const ingredients = getIngredients(props),
    elementToRender = getElementToRender(ingredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {elementToRender}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

const getIngredients = (props) => {
  const ingredients = props.ingredients || {};
  return Object
  .keys(ingredients)
  .map(key => 
    [...Array(ingredients[key])]
    .map((_, index) => <BurgerIngredient key={index + key} type={key} /> )
  )
  .reduce((result, value) => {
    return result.concat(value);
  }, []);
};

const getElementToRender = (ingredients = []) => (ingredients.length) ? ingredients : <p>:)</p>;

export default burger;