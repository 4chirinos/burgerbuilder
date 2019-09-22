import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const CONTROLS = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
  const controls = getControls(props, CONTROLS);
  return (
    <div className={classes.BuildControl}>
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.updatePurchasing}>
        Order Now!
      </button>
    </div>
  );
};

const getControls = (props, controls) => controls.map(control => 
    <BuildControl
      key={control.label}
      label={control.label}
      type={control.type}
      disabled={props.disabled[control.type]}
      addIngredient={props.addIngredient}
      removeIngredient={props.removeIngredient} />);

export default buildControls;