import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import Api from '../../../Api';

class ContactData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formElements: this.getFormElements(),
      loading: false
    };
  }

  render() {

    if (this.state.loading) {
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
    this.setState({loading: true});
    const contactData = this.getContactData();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      contactData
    };
    Api.createOrder(order)
    .then(response => {
      this.setState({loading: false});
      this.props.history.push('/');
    })
    .catch(error => {
      this.setState({loading: false});
      console.log(error);
    });
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

export default ContactData;