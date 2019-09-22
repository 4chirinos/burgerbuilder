import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Api from '../../Api';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    console.log('[Orders] component did mount');
    Api.getOrders()
    .then(orders => this.setState({orders, loading: false}))
    .catch(error => {
      this.setState({loading: false})
      console.log(error)
    });
  }

  render() {
    
    if (this.state.loading) {
      return <Spinner />
    }

    const orders = this.getOrders();

    return (
      <div>{orders}</div>
    );
  }

  getOrders = () => {
    return this.state.orders
      .map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />);
  };

}

export default Orders;