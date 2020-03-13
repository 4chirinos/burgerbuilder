import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as actionCreators from '../../store/actions';

class BurgerBuilder extends Component {

  state = {
    purchasing: false
  }

  componentDidMount() {
    console.log('[BurgerBuilder] - componentDidMount');
  }

  render () {
    const disabledInfo = this.getDisabledInfo();
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
          <OrderSummary
            price={this.props.totalPrice}
            ingredients={this.props.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purcharseContinueHandler} />
        </Modal>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
         addIngredient={this.props.onAddedIngredient}
         removeIngredient={this.props.onRemovedIngredient}
         updatePurchasing={this.updatePurchasingHandler}
         disabled={disabledInfo}
         price={this.props.totalPrice}
         purchasable={this.isPurchasable()} />
      </React.Fragment>
    );
  }

  getDisabledInfo = () => Object
    .keys(this.props.ingredients)
    .reduce((result, value) => {
      result[value] = this.props.ingredients[value] <= 0;
      return result;
    }, {});

  isPurchasable = () => {
    const sum = Object
      .keys(this.props.ingredients)
      .map(key => this.props.ingredients[key])
      .reduce((result, value) => result + value, 0);
    return sum > 0;
  }

  updatePurchasingHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purcharseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddedIngredient: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
    onRemovedIngredient: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);