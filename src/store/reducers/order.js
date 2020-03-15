import * as actionTypes from '../actions/actions';

const initialState = {
  loading: false,
  orders: [],
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.payload.order,
        orderId: action.payload.orderId
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.payload.status
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders
      };
    default:
      return state;
  }
};

export default reducer;