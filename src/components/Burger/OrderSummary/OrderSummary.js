import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  componentDidUpdate() {
    console.log('[OrderSummary] Order summary did update');
  }

  getSummary = (ingredients) => {
    return Object
      .keys(ingredients)
      .map((key, index) => 
        <li key={index + key}>
          <span style={{textTransform: 'capitalize'}}>
            {key}
          </span>: {ingredients[key]}
        </li>);
  };

  formatPrice = (price) => price.toFixed(2);

  render() {
    const summary = this.getSummary(this.props.ingredients);
    return (
      <React.Fragment>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{summary}</ul>
        <p><strong>Total price: {this.formatPrice(this.props.price)}</strong></p>
        <p>Continue to checkout ?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCanceled}>Cancel</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
      </React.Fragment>
    );
  }
} 

export default OrderSummary;