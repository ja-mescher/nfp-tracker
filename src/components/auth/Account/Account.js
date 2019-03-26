import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: 0,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  }
});

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pendingResponse: false
    }
  }

  submit = (e) => {
    e.preventDefault()
    this.setState({
      pendingResponse: true
    })
    this.props.signOut().then(() => {
      console.log('resetPassword Success!')
    }).catch((err) => {
      this.setState({
        pendingResponse: false
      })
    })
  }

  render() {
    const { classes, history } = this.props;
    const { pendingResponse } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        {pendingResponse ? <LinearProgress /> : null}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography variant="h5">
            Account
          </Typography>
          <form className={classes.form} onSubmit={this.submit}>
            <Button
              type="submit"
              color="primary"
              className={classes.button}
            >
              Sign Out
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={history.goBack}
            >
              Return
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
