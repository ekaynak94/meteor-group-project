import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import JobCards from "../../components/JobCards";
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
// import "react-dates/initialize";
// import { SingleDatePicker } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";

class SimpleModal extends React.Component {
  state = {
    open: false,
    selectedDate: new Date("2014-08-18T21")
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, jobs } = this.props;
    const { selectedDate } = this.state;
    console.log("employee", jobs);
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item x={8} />
          <Grid item x={8}>
            {" "}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.grid} justify="space-around">
                <DatePicker
                  margin="normal"
                  label="Date picker"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />


              {/* <SingleDatePicker
                    date={this.state.date} // momentPropTypes.momentObj or null
                    onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="datePicker" // PropTypes.string.isRequired,
                    numberOfMonths={1}
                  /> */}


              </Grid>
            </MuiPickersUtilsProvider>
            <Typography gutterBottom>List of Jobs:</Typography>
            <List dense className={classes.root}>
              {jobs.map(job => (
                <ListItem key={job._id} >
                  <JobCards job={job} />
                  <ListItemSecondaryAction>
                    {/* <Checkbox
                      onChange={this.handleToggle(value)}
                      checked={this.state.checked.indexOf(value) !== -1}
                    /> */}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>{" "}
          Jobs Requested
          {/* { <Button onClick={this.handleOpen}>Open Modal</Button> {" "}
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div className={classes.paper}>
                <JobCards />
              </div>
            </Modal> } */}
          {/* </div>;
        <Typography gutterBottom>
          Click to get the full Modal experience!
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} justify="space-around">
            <DatePicker
              margin="normal"
              label="Date picker"
              value={selectedDate}
              onChange={this.handleDateChange}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        {/* {jobs.map(job => {
          <div key={job.id}> */}
          {/* <Button onClick={this.handleOpen}>{job.title}</Button>; */}
          <Button onClick={this.handleOpen}>Open Modal</Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div className={classes.paper}>
              <JobCards job={jobs} />
            </div>
          </Modal>
          {/* </div>;
        })} */}
        </Grid>
      </div>
    );
  }
}

// SimpleModal.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default withTracker(() => {
  Meteor.subscribe("jobs");
  const jobs = Jobs.find({}).map(job => {
    return { ...job };
  });

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    jobs: jobs
  };
})(SimpleModalWrapped);
