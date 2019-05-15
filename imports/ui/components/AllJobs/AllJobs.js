import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withTracker } from "meteor/react-meteor-data";
import Divider from "@material-ui/core/Divider";
import Gravatar from "react-gravatar";
import { Jobs } from "../../../api/jobs";
import moment from "moment";
import styles from "./styles";

const ItemsList = props => {
  const { classes, jobs } = props;
  console.log(props.jobs);
  return (
    <div>
      <Typography className={classes.h2} component="h2">
        All Jobs
      </Typography>
      <Card className={classes.card}>
        <List className={classes.root}>
          {jobs.map(job => {
            return (
              <div key={job._id}>
                <Divider />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <Gravatar
                        email={job.owner && job.owner.emails[0].address}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={job.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {job.description}{" "}
                        </Typography>
                        <Typography
                          component="span"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Date:{" "}
                          {moment(jobs.createdAt)
                            .add(10, "days")
                            .calendar()}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Card>
    </div>
  );
};

ItemsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  Meteor.subscribe("jobs");
  Meteor.subscribe("allUsers");

  console.log(Meteor.users.find().fetch());
  const jobs = Jobs.find({}).map(job => {
    const owner = Meteor.users.findOne({ _id: job.ownerId });
    return { ...job, owner: owner };
  });
  // console.log("this", jobs);
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    jobs
  };
})(withStyles(styles)(ItemsList));