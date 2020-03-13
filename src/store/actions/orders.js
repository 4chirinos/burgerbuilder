import * as actionTypes from './actions';
import Api from '../../Api';

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: { orderId, orderData } 
  }
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    payload: { error }
  }
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (order) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    Api.createOrder(order)
    .then(response => {
      dispatch(purchaseBurgerSuccess(order.id, order));
    })
    .catch(error => {
      console.log(error);
      dispatch(purchaseBurgerFailed(error));
    });
  };
};