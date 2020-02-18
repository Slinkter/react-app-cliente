import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.jpg";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
// github 
const styles = {
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
  progress : {
    position : 'absolute'
  }
};

class login extends Component {
  //---------------------------->
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }
  //---------------------------->
  handleSubmit = e => {
    //%%%%%%%%%%%%%%%%%%%
    e.preventDefault();
    //%%%%%%%%%%%%%%%%%%%
    this.setState({
      loading: true
    });
    //%%%%%%%%%%%%%%%%%%%
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    //%%%%%%%%%%%%%%%%%%%
    axios
      .post("/login", userData)
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };
  //---------------------------->
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  //---------------------------->
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img className={classes.image} src={AppIcon} alt="adsad" />
          <Typography className={classes.pagetitle} variant="h2">
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.Button}
              value="Enviar "
              disabled = {loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className = {classes.progress}/>
              ) }
            </Button>
            <br></br>
            <small>
              Do not have an account ? sign up <Link to="/signup"> here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
/*
login.prototype = {
  classes : PropTypes.object.isRequired
}
*/
export default withStyles(styles)(login);
