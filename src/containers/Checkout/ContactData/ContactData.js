import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Api from '../../../Api';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {},
    loading: false
  };

  render() {

    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input className={classes.Input} type='text' name='name' placeholder='your name'></input>
          <input className={classes.Input} type='email' name='email' placeholder='your email'></input>
          <input className={classes.Input} type='text' name='street' placeholder='your street'></input>
          <input className={classes.Input} type='text' name='postal' placeholder='your postal'></input>
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Arge',
        address: {
          street: 'street 1',
          zipCode: 'zipCode 1',
          country: 'Vnzla'
        },
        email: 'react@react.com'
      },
      deliveryMode: 'fastest'
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

}

export default ContactData;