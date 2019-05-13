import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Gravatar from "react-gravatar";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import { users } from "../../../mock/mockdatabase";

// const JobCards = ({ classes, user }) => {
//   console.log(users, "user");

//   return (
//     <div>
//       <Card className={classes.card}>
//         <Fragment>
//           <CardContent>
//             <div>
//               <div>
//                 <Avatar className={classes.avatar} />
//               </div>
//             </div>
//             <Typography variant="display1">{user.name}</Typography>

//             {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
//             <Typography variant="display1">Date</Typography>
//             {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
//             <Typography variant="display1">Location</Typography>
//             {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
//             <Typography variant="display1">
//               {user.professions.join(", ")}
//             </Typography>
//             {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
//             <Typography variant="display1">Description</Typography>
//             {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
//             <Typography variant="display1">{user.workplaces}</Typography>
//           </CardContent>
//         </Fragment>
//         <CardActions>
//           <Button
//             className={classes.button}
//             variant="outlined"
//             size="small"
//             color="primary"
//           >
//             Request
//           </Button>
//         </CardActions>
//       </Card>
//     </div>
//   );
// };

class JobCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitleInput: "",
      jobDescriptionInput: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.jobInput = React.createRef();
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    const { jobTitleInput, jobDescriptionInput } = this.state;
    const { classes, user } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <Fragment>
            <CardContent>
              <div>
                <div>
                  <Avatar className={classes.avatar} />
                </div>
              </div>
              {/* <Typography variant="display1">{user.name}</Typography> */}

              <form onSubmit={this.handleSubmit}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.text} htmlFor="fullname">
                    Username
                  </InputLabel>
                  <Input
                    id="title"
                    type="text"
                    inputProps={{ autoComplete: "off" }}
                    value={jobTitleInput}
                    onChange={e => this.handleInput(e, "jobTitleInput")}
                    className={classes.text}
                    ref={this.jobInput}
                  />
                </FormControl>
              </form>

              {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
              <Typography variant="display1">Date</Typography>
              {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
              <Typography variant="display1">Location</Typography>
              {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
              <Typography variant="display1">
                {user.professions.join(", ")}
              </Typography>
              {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
              <Typography variant="display1">Description</Typography>
              {/* <TextField inputProps ={{ inputProps: {}  }} /> */}
              <Typography variant="display1">{user.workplaces}</Typography>
            </CardContent>
          </Fragment>
          <CardActions>
            <Button
              className={classes.button}
              variant="outlined"
              size="small"
              color="primary"
            >
              Request
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

JobCards.defaultProps = { user: users };

export default withStyles(styles)(JobCards);
