import * as actionTypes from './actions';
import Api from '../../Api';

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { ingredient }
  };
};

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: { ingredient }
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: { ingredients }
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    Api
    .getIngredients()
    .then(ingredients => dispatch(setIngredients(ingredients)))
    .catch(error => dispatch(fetchIngredientsFailed()));
  };
};