import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  const attachedClasses = getAttachedClasses(props);
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.closed}/>
      <div className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

const getAttachedClasses = (props) =>
  (props.show) ?
  [classes.SideDrawer, classes.Open].join(' ') :
  [classes.SideDrawer, classes.Close].join(' ');

export default sideDrawer;