import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

import AuthRoute from "./util/AuthRoute";

import "./App.css";
//
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#311223",
      main: "#F11223",
      dark: "#A11223",
      contrastText: "#FFF"
    },
    secondary: {
      light: "#F11223",
      main: "#F11223",
      dark: "#F11223",
      contrastText: "#FFF"
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto",
    height: "  70px"
  },
  pageTitle: {
    margin: "20px auto 15px auto"
  },
  textField: {
    margin: "10px auto 15px auto"
  },
  customError: {
    color: "blue",
    fontSize: "0.82rem",
    margin: "10px 0 10px 0 "
  },
  progress: {
    position: "absolute"
  }
});
let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodeToken = jwtDecode(token);
  console.log(decodeToken);
  if (decodeToken.exp * 1000 < Date.now()) {
    window.localStorage.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/" exact component={home} />
                <AuthRoute
                  path="/login"
                  component={login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  path="/signup"
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
