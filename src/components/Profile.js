import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EditDetails from './EditDetails'
//
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
//
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import { CalendarToday } from "@material-ui/icons/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
//
import dayjs from "dayjs";
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

import {logoutUser,uploadImage} from '../redux/actions/userActions'

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "red"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formDate = new FormData();

    formDate.append('image',image,image.name ) ;
    this.props.uploadImage(FormData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser()
  }
  

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img scr={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
              />
              <Tooltip title="Edite profile picture" placeholder="image">
                <IconButton onClick={this.handleEditPicture} className="button">
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span> {location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary">
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {" "}
                      {website}{" "}
                    </a>
                    <hr />
                  </LinkIcon>
                </Fragment>
              )}

              <CalendarToday color="primary" />
              {""}
              <span>Joubed {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>

                <Tooltip  title="Logout" placement ="top">
                  <IconButton onClick={this.handleLogout}>
                    <KeyboardReturn color="primary"/>
                  </IconButton>

                </Tooltip>

                <EditDetails/>




          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <p>loading...que raro</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {logoutUser,uploadImage};


Profile.protoType = {
  logoutUser : PropTypes.func.isRequired,
  uploadImage : PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Profile));
