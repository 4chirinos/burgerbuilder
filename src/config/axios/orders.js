import axios from 'axios';
import constants from '../constants';

const instance = axios.create({
  baseURL: constants.API.ORDERS.BASE_URL
});

export default instance;