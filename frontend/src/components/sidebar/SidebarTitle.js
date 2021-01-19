import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';

const useStyles = makeStyles((theme) => ({
  title: {
    justifySelf: 'flex-start',
  },
  openButton: {
    justifySelf: 'flex-end',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 1),
  },
}));

AppSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function AppSidebar() {
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const dispatch = useDispatch();
  const { showDrawer } = useSelector(({ items }) => ({
    showDrawer: items.showDrawer,
  }));
  const handleDrawerClose = () => void dispatch(ia.setShowDrawer({ showDrawer: false }));
  const handleDrawerOpen = () => void dispatch(ia.setShowDrawer({ showDrawer: true }));
  const classes = useStyles();
  return (
    <div className={classes.toolbar}>
      {showDrawer && (
        <Typography className={classes.title} variant="h6">
          Timeblock
        </Typography>
      )}
      {!smUp && (
        <IconButton className={classes.openButton} onClick={showDrawer ? handleDrawerClose : handleDrawerOpen}>
          {showDrawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      )}
    </div>
  );
}
