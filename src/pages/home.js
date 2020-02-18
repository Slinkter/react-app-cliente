import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Scream from "../components/Scream";

class home extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    console.log("hola"); 
    axios
      .get(
        "https://us-central1-webproject-f896a.cloudfunctions.net/api/screams"
      )
      .then(res => {
        console.log("res" + res);
        console.log(res.data);
        this.setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let recentScreamMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>Loading ...</p>
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p> Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
