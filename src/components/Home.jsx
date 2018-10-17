import React from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: theme.spacing.unit * 2,
  },
});

const Home = ({classes, action}) => (
  <div>
    <Button
      variant="outlined"
      color="primary"
      aria-label="Add"
      className={classes.button}
      onClick={action}
    >
      <AddIcon />
    </Button>
  </div>
)

// Home.propTypes = {
//
// }

export default withStyles(styles)(Home)
