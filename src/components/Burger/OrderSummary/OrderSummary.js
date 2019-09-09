import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const summary = getSummary(props);
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {summary}
      </ul>
      <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout ?</p>
      <Button btnType='Danger' clicked={props.purchaseCanceled}>Cancel</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
    </Aux>
  );
};

const getSummary = (props) => {
  return Object
    .keys(props.ingredients)
    .map((key, index) => 
      <li key={index + key}>
        <span style={{textTransform: 'capitalize'}}>
          {key}
        </span>: {props.ingredients[key]}
      </li>);
};

export default orderSummary;