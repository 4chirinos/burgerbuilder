import React from 'react';

import classes from './Input.css';

const input = (props) => {
  const inputElement = getInputElement(props);
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

const getInputElement = (props) => {
  let inputElement = null;
  switch(props.elementType) {
    case ('input'):
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('select'):
      const options = props.elementConfig.options.map(option =>
        <option key={option.value} value={option.value}>{option.displayValue}</option>);
      inputElement = (
        <select
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}>
            {options}
        </select>
      );
      break;
    default:
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.chaned} />;
  }
  return inputElement;
};

export default input;