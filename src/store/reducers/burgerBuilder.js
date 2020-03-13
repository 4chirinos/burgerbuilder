import * as actionTypes from '../actions/actions';

const initialState = {
  ingredients: {},
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  const ingredient = action.payload ? action.payload.ingredient : null;
  const quantity = state.ingredients[ingredient] || 0;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredient]: quantity + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredient]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredient]: quantity - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredient]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload.ingredients,
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;