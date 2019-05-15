import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Jobs } from "../../../api/jobs";
import JobCards from "../../components/JobCards";
import NavBar from "../../components/NavBar";
import styles from "./styles";
import moment from "moment";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`
//   };
// }

class SimpleModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, jobs } = this.props;

    return (
      <>
        <NavBar />
        {moment()
          .startOf("day")
          .fromNow()}

        <Typography gutterBottom>
          Click to get the full Modal experience!
        </Typography>
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
            <JobCards />
          </div>
        </Modal>

        {/* </div>;
        })} */}
      </>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
