import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import JobCards from "../../components/JobCards";
import NavBar from "../../components/NavBar";
import styles from "./styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { Jobs } from "../../../api/jobs";
import { withTracker } from "meteor/react-meteor-data";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { GridList } from "@material-ui/core";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import Drawer from "@material-ui/core/Drawer";
import { getJobPosts, getApplications } from "../../../api/functions";

class SimpleModal extends React.Component {
  state = {
    open: false,
    // selectedDate: new Date("2014-08-18T21")
  };

  // handleDateChange = date => {
  //   this.setState({ selectedDate: date });
  // };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  findStatus(job) {
    const { applications } = this.props;
    const myApp = applications.find(
      application => application.job._id === job._id
    );
    if (!myApp) {
      return "Request";
    } else {
      const status = myApp.status;
      if (status === true) {
        return "Accepted";
      } else if (status === false) {
        return "Declined";
      } else {
        return "Pending";
      }
    }
  }
  render() {
    const { classes, jobs } = this.props;
    return (
      <div>
        <NavBar />
        <Typography gutterBottom>Request A Job</Typography>


        {/* <SingleDatePicker
          date={this.state.date}
          onDateChange={date => this.setState({ date })}
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
          id="datePicker"
          numberOfMonths={1}
        /> */}

        
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List dense className={classes.root}>
            {jobs.map(job => (
              <ListItem key={job._id}>
                <JobCards status={this.findStatus(job)} job={job} />
                <ListItemSecondaryAction />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default withTracker(() => {
  Meteor.subscribe("openJobs");
  Meteor.subscribe("userProfiles");
  Meteor.subscribe("sentApplications");

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    jobs: getJobPosts(),
    applications: getApplications()
  };
})(SimpleModalWrapped);
