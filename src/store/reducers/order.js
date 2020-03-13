import * as actionTypes from '../actions/actions';

const initialState = {
  loading: false,
  orders: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.payload.order,
        orderId: action.payload.orderId
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
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
    default:
      return state;
  }
};

export default reducer;