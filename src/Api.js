import AxiosOrders from './config/axios/orders';
import constants from './config/constants';

class Api {

  static sendOrder(order) {
    console.log('order');
    return new Promise((resolve, reject) => {
      AxiosOrders.post(constants.API.ORDERS.CREATE_URL, order)
      .then(response => resolve(response))
      .catch(error => reject(error));
    });
  }

}

export default Api;