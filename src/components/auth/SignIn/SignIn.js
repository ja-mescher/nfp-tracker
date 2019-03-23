import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link, Redirect } from 'react-router-dom'

const styles = theme => ({
  main: {
    paddingTop: theme.spacing.unit * 4,
    width: 'auto',
    display: 'flex', // Fix IE 11 issue.
    flexDirection: 'column',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 410,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  forgotPassword: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: 0,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
  }
});

const errorCodes = {
  'auth/invalid-email': {
    msg: 'Email address is not valid.',
    field: 'errorEmail'
  },
  'auth/user-disabled': {
    msg: 'Account disabled.',
    field: 'errorEmail'
  },
  'auth/user-not-found': {
    msg: 'No account corresponding to the given email.',
    field: 'errorEmail'
  },
  'auth/wrong-password': {
    msg: 'Wrong Password. Try again or click Forgot password to reset it.',
    field: 'errorPassword'
  },
}

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorEmail: null,
      errorPassword: null,
      pendingResponse: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      errorEmail: null,
      errorPassword: null,
      pendingResponse: false
    });
  };

  submit = (e) => {
    e.preventDefault()
    this.setState({
      errorEmail: null,
      errorPassword: null,
      pendingResponse: true
    })
    this.props.signIn(this.state.email, this.state.password).then(() => {
      console.log('signIn Success!')
    }).catch((err) => {
      this.setState({
        [errorCodes[err.code]['field']]: errorCodes[err.code]['msg'],
        password: '',
        pendingResponse: false
      })
    })
  }

  render() {
    const { classes, location, profileLoaded } = this.props;
    const { pendingResponse } = this.state;
    const { from } = location.state || { from: { pathname: `/${profileLoaded}/observations` } };

    if(profileLoaded) {
      return <Redirect to={from} />;
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        {pendingResponse ? <LinearProgress /> : null}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.submit}>
            <TextField
              id="email"
              label="Email Address"
              type="email"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange('email')}
              autoComplete="email"
              error={this.state.errorEmail !== null}
              helperText={this.state.errorEmail}
              autoFocus
              required
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange('password')}
              autoComplete="current-password"
              error={this.state.errorPassword !== null}
              helperText={this.state.errorPassword}
              required
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={pendingResponse}
            >
              Sign in
            </Button>
            <Button
              color="primary"
              className={classes.forgotPassword}
              component={Link}
              to="/reset-password"
            >
              Forgot Password
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
