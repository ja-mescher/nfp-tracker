import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Calendar from './Calendar'

const styles = theme => ({
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: theme.spacing.unit,
    zIndex: 1000
  },
});

function Observations(props) {
  const { classes, match } = props;
  return (
    <div>
      <Button
        variant="fab"
        color="primary"
        aria-label="Add"
        className={classes.button}
        component={Link}
        to={`${match.url}/add-new`}
      >
        <AddIcon />
      </Button>
      <Calendar />
    </div>
  );
}

Observations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Observations);
