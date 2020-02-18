import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuithemProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import "./App.css";
//PAge
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";

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
  }
});

class App extends Component {
  render() {
    return (
      <MuithemProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/" exact component={home} />
                <Route path="/login" component={login} />
                <Route path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuithemProvider>
    );
  }
}

export default App;
