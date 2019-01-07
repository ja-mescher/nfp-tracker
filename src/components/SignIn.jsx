import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

const styles = theme => ({
  root: {
   ...theme.mixins.gutters(),
   paddingTop: theme.spacing.unit * 2,
   paddingBottom: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = property => event => {
    this.setState({
      [property]: event.target.value
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/profiles" } };
    const { classes, signIn, isAuthenticated } = this.props;
    const { email, password } = this.state;

    if(isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Paper className={classes.root} elevation={2}>
          <Typography variant="h5">
            Sign In
          </Typography>
          <TextField
            id="email"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange('email')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            value={password}
            onChange={this.handleChange('password')}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={()=>signIn(email, password)}
          >
            Sign In
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SignIn);
