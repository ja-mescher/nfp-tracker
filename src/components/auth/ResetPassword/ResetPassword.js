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
import { Link } from 'react-router-dom'

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
  login: {
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
  'auth/user-not-found': {
    msg: 'No account corresponding to the given email.',
    field: 'errorEmail'
  },
}

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      errorEmail: null,
      pendingResponse: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      errorEmail: null,
      pendingResponse: false
    });
  };

  submit = (e) => {
    e.preventDefault()
    this.setState({
      errorEmail: null,
      pendingResponse: true
    })
    this.props.resetPassword(this.state.email).then(() => {
      console.log('resetPassword Success!')
    }).catch((err) => {
      this.setState({
        [errorCodes[err.code]['field']]: errorCodes[err.code]['msg'],
        pendingResponse: false
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { pendingResponse } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        {pendingResponse ? <LinearProgress /> : null}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            Password Reset
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={pendingResponse}
            >
              Send Email
            </Button>
            <Button
              color="primary"
              className={classes.login}
              component={Link}
              to="/"
            >
              Back to Login
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);
