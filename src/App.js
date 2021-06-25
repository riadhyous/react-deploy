import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddProvider from "./pages/manageProviders/AddProvider";
import UpdateProvider from "./pages/manageProviders/UpdateProvider";
import ManageProviders from "./pages/manageProviders/ManageProviders";
import { auth } from "./pages/services/firebase";
import './styles.css';
import addService from "./pages/manageServices/AddService";
import UpdateService from "./pages/manageServices/UpdateService";
import ManageServices from "./pages/manageServices/ManageServices";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
            <Redirect to="/home" />
          )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/home"
              authenticated={this.state.authenticated}
              component={Home}
            />
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/manageProviders"
              authenticated={this.state.authenticated}
              component={ManageProviders}
            />
            <PrivateRoute
              path="/addProvider"
              authenticated={this.state.authenticated}
              component={AddProvider}
            />
            <PrivateRoute
              path="/updateProvider"
              authenticated={this.state.authenticated}
              component={UpdateProvider}
            />
            <PrivateRoute
              path="/manageServices"
              authenticated={this.state.authenticated}
              component={ManageServices}
            />
            <PrivateRoute
              path="/addService"
              authenticated={this.state.authenticated}
              component={addService}
            />
            <PrivateRoute
              path="/updateService"
              authenticated={this.state.authenticated}
              component={UpdateService}
            />
            <PublicRoute
              path="/signup"
              authenticated={this.state.authenticated}
              component={Signup}
            />
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={Login}
            />
          </Switch>
        </Router>
      );
  }
}

export default App;
