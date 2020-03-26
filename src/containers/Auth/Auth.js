import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import * as actions from '../../store/actions';

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formElements: this.getFormElements()
    };
  }

  render() {

    const inputElements = this.getInputElements(this.state.formElements);
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          { inputElements }
          <Button btnType='Success'>SUBMIT</Button>
        </form>
      </div>
    );
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

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.formElements.email.value, this.state.formElements.password.value);
  }

  getFormElements = () => {
    return {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: ''
      }
    };
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Auth);