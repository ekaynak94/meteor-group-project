import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      nameInput: "",
      statusInput: "employee",
      descriptionInput: "",
      emailInput: "",
      passwordInput: "",
      error: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setError = this.setError.bind(this);
  }

  handleInput(e, stateKey) {
    this.setState({ [stateKey]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError(null);
    if (this.state.isLogin) {
      Meteor.loginWithPassword(
        this.state.emailInput,
        this.state.passwordInput,
        e =>
          e
            ? this.setError(
                "Unable to log in. Please check your login details and try again."
              )
            : this.props.history.push("/")
      );
    } else {
      Accounts.createUser(
        {
          profile: {
            name: this.state.nameInput,
            employer: this.state.statusInput === "employer" ? true : false,
            description: this.state.descriptionInput
          },
          email: this.state.emailInput,
          password: this.state.passwordInput
        },
        e =>
          e
            ? e.reason === "Email already exists."
              ? this.setError("Email already in use")
              : console.log(e.reason) &&
                alert(
                  "Something went wrong. 😭 Please refresh and try again..."
                )
            : this.props.history.push("/")
      );
    }
  }

  setError(err) {
    this.setState({ error: err });
  }

  render() {
    const {
      nameInput,
      statusInput,
      descriptionInput,
      emailInput,
      passwordInput,
      error
    } = this.state;
    const { classes } = this.props;

    return (
      <>
        <form onSubmit={this.handleSubmit} className={classes.accountForm}>
          {!this.state.isLogin && (
            <>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.text} htmlFor="fullname">
                  Username
                </InputLabel>
                <Input
                  id="fullname"
                  type="text"
                  inputProps={{ autoComplete: "off" }}
                  value={nameInput}
                  onChange={e => this.handleInput(e, "nameInput")}
                  className={classes.text}
                  required
                />
              </FormControl>
              <FormControl
                fullWidth
                component="fieldset"
                className={classes.radioFormControl}
              >
                <FormLabel component="legend">Profile Status</FormLabel>
                <RadioGroup
                  aria-label="Profile status"
                  name="profile-status"
                  className={classes.radioGroup}
                  value={statusInput}
                  onChange={e => this.handleInput(e, "statusInput")}
                >
                  <FormControlLabel
                    value="employee"
                    control={<Radio />}
                    label="Employee"
                  />
                  <FormControlLabel
                    value="employer"
                    control={<Radio />}
                    label="Employer"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={classes.text} htmlFor="jobdescription">
                  Job Description
                </InputLabel>
                <Input
                  id="job"
                  type="text"
                  inputProps={{ autoComplete: "off" }}
                  value={descriptionInput}
                  onChange={e => this.handleInput(e, "descriptionInput")}
                  className={classes.text}
                  required
                />
              </FormControl>
            </>
          )}
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.text} htmlFor="email">
              Email
            </InputLabel>
            <Input
              id="email"
              type="email"
              inputProps={{
                autoComplete: "off"
              }}
              value={emailInput}
              onChange={e => this.handleInput(e, "emailInput")}
              className={classes.text}
              required
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.text} htmlFor="password">
              Password
            </InputLabel>
            <Input
              id="password"
              type="password"
              inputProps={{ autoComplete: "off" }}
              value={passwordInput}
              onChange={e => this.handleInput(e, "passwordInput")}
              className={classes.text}
              required
            />
          </FormControl>
          {error && (
            <Typography className={classes.errorMessage}>{error}</Typography>
          )}
          <FormControl className={classes.formControl}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Button
                type="submit"
                className={classes.formButton}
                variant="contained"
                size="large"
                color="secondary"
                disabled={false}
              >
                {this.state.isLogin ? "Enter" : "Create Account"}
              </Button>
              <Typography className={classes.text}>
                <button
                  className={classes.formToggle}
                  type="button"
                  onClick={() => {
                    this.setState({
                      isLogin: !this.state.isLogin
                    });
                  }}
                >
                  {this.state.isLogin
                    ? "Create an account."
                    : "Login to existing account."}
                </button>
              </Typography>
            </Grid>
          </FormControl>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(AccountForm));
