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
      dispatch(purchaseBurgerSuccess(response.name, order));
    })
    .catch(error => {
      console.log(error);
      dispatch(purchaseBurgerFailed(error));
    });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const setLoadingStatus = (status) => {
  return {
    type: actionTypes.SET_LOADING_STATUS,
    payload: { status }
  };
};

export const setOrders = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: { orders }
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(setLoadingStatus(true));
    Api.getOrders()
    .then(orders => {
      dispatch(setLoadingStatus(false));
      dispatch(setOrders(orders));
    })
    .catch(error => {
      console.log(error)
    });
  };    
};