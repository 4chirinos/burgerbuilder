import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actionCreators from '../../../store/actions';

class ContactData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formElements: this.getFormElements()
    };
  }

  render() {

    if (this.props.loading) {
      return <Spinner />;
    }

    const inputElements = this.getInputElements(this.state.formElements);

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {inputElements}
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }

  orderHandler = (event) => {
    event.preventDefault();
    const contactData = this.getContactData();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      contactData
    };
    this.props.onOrderBurger(order);
  }

  getContactData = () => {
    const formElements = this.state.formElements;
    return {
      name: formElements.name.value,
      street: formElements.street.value,
      zipCode: formElements.zipCode.value,
      country: formElements.country.value,
      email: formElements.email.value,
      deliveryMode: formElements.deliveryMode.value
    };
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElements = {
      ...this.state.formElements
    };
    const updatedInputElement = {
      ...this.state.formElements[inputIdentifier]
    };
    updatedInputElement.value = event.target.value;
    updatedFormElements[inputIdentifier] = updatedInputElement;
    this.setState({formElements: updatedFormElements});
  }

  getInputElements = (formElements) => {
    return Object
    .keys(formElements)
    .map(key => {
      const element = formElements[key];
      return <Input
        key={key}
        elementType={element.elementType}
        elementConfig={element.elementConfig}
        value={element.value}
        changed={(event) => this.inputChangedHandler(event, key)} />;
    });
  }

  getFormElements = () => {
    return {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      deliveryMode: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'Fastest', displayValue: 'Fastest'},
            {value: 'Cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
    };
  }

}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order) => dispatch(actionCreators.purchaseBurger(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);