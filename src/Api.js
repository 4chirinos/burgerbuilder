import firebase from './config/axios/firebase';
import constants from './constants/constants';

class Api {

  static createOrder(order) {
    return new Promise((resolve, reject) => {
      firebase.post(constants.API.ORDERS.URL, order)
      .then(response => resolve(response))
      .catch(error => reject(error));
    });
  }

  static getIngredients() {
    return new Promise((resolve, reject) => {
      firebase.get(constants.API.INGREDIENTS.URL)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  }

  static getOrders() {
    return new Promise((resolve, reject) => {
      firebase.get(constants.API.ORDERS.URL)
      .then(response => {
        const orders = Object
          .keys(response.data)
          .map(key => {
            return {...response.data[key], id: key};
          });
        resolve(orders);
      })
      .catch(error => reject(error));
    });
  }

}

export default Api;