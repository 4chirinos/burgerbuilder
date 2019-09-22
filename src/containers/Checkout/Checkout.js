import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {},
    price: 0
  };

  componentDidMount() {
    const ingredients = this.getIngredients(this.props.location.search);
    const price = this.getPrice(this.props.location.search);
    this.setState({ingredients, price});
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutContinue={this.checkoutContinueHandler}
          onCheckoutCancel={this.checkoutCancelHandler}
        />
        <Route path={this.props.match.path + '/contact-data'} render={() => this.getContactDataComponent()}></Route>
      </div>
    );
  }

  getIngredients = (queryString) => {
    const ingredients = {};
    const pairs = new URLSearchParams(queryString);
    pairs.forEach((value, name) => {
      if (name !== 'price') {
        ingredients[name] = +value;
      }
    });
    return ingredients;
  }

  getPrice = (queryString) => {
    let price = 0;
    const pairs = new URLSearchParams(queryString);
    pairs.forEach((value, name) => {
      if (name === 'price') {
        price = value;
        return;
      }
    });
    return price;
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }
  
  getContactDataComponent = () =>
    <ContactData ingredients={this.state.ingredients} price={this.state.price} {...this.props} />

}

export default Checkout;