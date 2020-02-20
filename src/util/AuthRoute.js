import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../redux/store";
import PropTypes from 'prop-types'

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateProps = state => ({
  authenticated: state.user.authenticated
});

AuthRoute.prototype = {
  user:PropTypes.object.isRequired
}


export default connect(mapStateProps)(AuthRoute);
