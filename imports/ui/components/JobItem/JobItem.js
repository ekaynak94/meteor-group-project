import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Gravatar from "react-gravatar";
import moment from "moment";
import styles from "./styles";
import Button from "@material-ui/core/Button";
import { deleteJob } from "../../helpers/functions";
import DeleteIcon from "@material-ui/icons/Delete";

const JobItem = ({ classes, job, applications }) => {
  return (
    <div className={classes.root} key={job._id}>
      <ListItem className={classes.list} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>
            <Gravatar email={job.owner ? job.owner.emails[0].address : ""} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          className={classes.h1}
          primary={job.title}
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                Description: {job.description}{" "}
              </Typography>{" "}
              <Typography component="span" color="textPrimary">
                Date:{" "}
                {moment(job.createdAt)
                  .add(10, "days")
                  .calendar()}
              </Typography>{" "}
              <Typography component="span" color="textPrimary">
                Skills: {job.professions.join(", ")}
              </Typography>
            </React.Fragment>
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            deleteJob(job, applications);
          }}
        >
          <DeleteIcon />
        </Button>
      </ListItem>
    </div>
  );
};

JobItem.propTypes = {
  classes: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
  applications: PropTypes.array
};

export default withStyles(styles)(JobItem);
