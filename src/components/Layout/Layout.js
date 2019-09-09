import React, { Component } from 'react';

import classes from './Layout.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  render () {
    return (
      <Aux>
        <Toolbar drawerToggleHandler={this.sideDrawerToggleHandler}/>
        <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}));
  }

}

export default Layout;