import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const information = getIngredientsInformation(props.ingredients);
  return (
    <div className={classes.Order}>
      <p>Ingredients:</p>
      <div>{information}</div>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  );
};

const getIngredientsInformation = (ingredients) => {
  return Object
    .keys(ingredients)
    .map(key => {
      return (<span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
        key={key}>{key}: ({ingredients[key]})</span>);
    });
};

export default order;