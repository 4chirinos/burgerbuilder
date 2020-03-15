import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  render() {
    const summary = (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          onCheckoutContinue={this.checkoutContinueHandler}
          onCheckoutCancel={this.checkoutCancelHandler}
        />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData}></Route>
      </div>
    );
    return Object.keys(this.props.ingredients).length === 0 || this.props.purchased ? <Redirect to="/" /> : summary;
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);