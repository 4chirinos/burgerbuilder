import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  render () {
    const disabledInfo = this.getDisabledInfo();
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
          <OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purcharseContinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
         addIngredient={this.addIngredientHandler}
         removeIngredient={this.removeIngredientHandler}
         updatePurchasing={this.updatePurchasingHandler}
         disabled={disabledInfo}
         price={this.state.totalPrice}
         purchasable={this.state.purchasable} />
      </React.Fragment>
    );
  }

  addIngredientHandler = (type) => {
    const currentPrice = this.state.totalPrice,
      ingredients = { ...this.state.ingredients };
    ingredients[type] += 1;
    this.setState({
      ingredients,
      totalPrice: currentPrice + INGREDIENT_PRICES[type]
    });
    this.updatePurchaseHandler(ingredients);
  }

  removeIngredientHandler = (type) => {
    const currentPrice = this.state.totalPrice,
      ingredients = { ...this.state.ingredients };
    ingredients[type] = (ingredients[type] - 1) > 0 ? ingredients[type] - 1 : 0;
    this.setState({
      ingredients,
      totalPrice: currentPrice - INGREDIENT_PRICES[type]
    });
    this.updatePurchaseHandler(ingredients);
  }

  getDisabledInfo = () => Object
    .keys(this.state.ingredients)
    .reduce((result, value) => {
      result[value] = this.state.ingredients[value] <= 0;
      return result;
    }, {});

  updatePurchaseHandler = (ingredients) => {
    const sum = Object
      .keys(ingredients)
      .map(key => ingredients[key])
      .reduce((result, value) => result + value, 0);
    this.setState({ purchasable: sum > 0 });
  }

  updatePurchasingHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purcharseContinueHandler = () => {
    alert('You continue!');
  }

}

export default BurgerBuilder;