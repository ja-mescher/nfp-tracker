import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

class RegisterUser extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.context.router.history.push("/app");
    }
  }

  handleChange = property => event => {
    this.setState({
      [property]: event.target.value
    })
  }

  render() {
    const { classes, registerUser } = this.props;
    const { email, password } = this.state;

    return (
      <div>
        <Paper className={classes.root} elevation={2}>
          <Typography variant="headline" component="h3">
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
            onClick={()=>registerUser(email, password)}
          >
            Register
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterUser);
