import React, { Component } from "react";
import { Link } from "react-router-dom";
//
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Mui Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const style = {
  card: {
    display: " flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit : 'cover'
  }
};

class Scream extends Component {
  render() {

    dayjs.extend(relativeTime);
    
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      }
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h4"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {body}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(style)(Scream);