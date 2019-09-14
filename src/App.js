import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {

  notify = () => {
    toast("Default Notification !");
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <Layout>
          <button onClick={this.notify}>Notify !</button>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
