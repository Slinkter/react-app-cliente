import React, { Component, Fragment } from "react";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";

import {Link} from 'react-router-dom'
import MuiLink from '@material-ui/core/Link'

import Typography from '@material-ui/core/Typography'
import LocationOn from "@material-ui/icons/LocationOn"; 
import LinkIcon from "@material-ui/icons/Link"; 
import CalendarToday from "@material-ui/icons/CalendarToday"; 

import dayjs from 'dayjs'


import { connect } from "react-redux";

const styles = {
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: 'red'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading
      }
    } = this.props;

    let profileMarkup = !loading ? (authenticated ? 
        (<Paper className ={ classes.paper} >

            <div className = {classes.profile}>
                <div className="profile-image">
                    <img scr={imageUrl} alt="profile" />
                </div>
                <hr/>
                <div className="profile-details">
                <MuiLink component={Link} to={`/users/${handle}`  }  color="primary" variant ="h5" >
                    @{handle}
                </MuiLink>
                <hr/>
        {bio && <Typography variant="body2" >{bio}</Typography>}
        <hr/>
        {location && (
            <Fragment>
            <LocationOn color="primary"/> <span> {location}</span>   
                    <hr/>
            </Fragment>

        )}{website && (
            <Fragment>
                <LinkIcon color="primary" > 
                    <a href={website} target="_blank" rel="noopener noreferrer" > {' ' } {website} </a>
                    <hr/>
                </LinkIcon>
            </Fragment>
        )}

        <CalendarToday color="primary"/>{''}
        <span>Joubed { dayjs(createdAt).format('MMM YYYY') }</span>

                </div>
            </div>

        </Paper>
        ) :(

            <Paper className={classes.paper}>
                <Typography variant="body2" align="center" >
                    No profile found, please login again

                    <div className={classes.buttons}>
                        <Button variant="contained"></Button>
                    </div>

                </Typography>

            </Paper>

        )):(<p>loading...</p>)

    return profileMarkup; 
  }
}

const mapStateToProps = state => ({
  user: state.user
});

Profile.protoType = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
