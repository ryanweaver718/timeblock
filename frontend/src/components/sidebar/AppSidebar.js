import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListAltIcon from '@material-ui/icons/ListAlt';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import SidebarActions from './SidebarActions';
// const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
  },
  drawer: {
    height: '100vh',
    borderRight: `1px solid ${theme.palette.grey.main}`,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
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
  showSearch: ({ showSearchItems }) => ({
    color: clsx({ [theme.palette.primary.main]: showSearchItems }),
  }),
  pickText: {
    display: 'flex',
    alignItems: 'center',
  },
  visible: ({ showSearchItems }) => ({
    marginLeft: '1rem',
    color: showSearchItems ? theme.palette.primary.main : theme.palette.grey.dark,
  }),
  subheader: {
    paddingBottom: '0rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

AppSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function AppSidebar() {
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const dispatch = useDispatch();
  const { showDrawer, showSearchItems } = useSelector(({ items }) => ({
    showDrawer: items.showDrawer,
    showSearchItems: items.showSearchItems,
  }));
  const handleDrawerClose = () => void dispatch(ia.setShowDrawer({ showDrawer: false }));
  const handleDrawerOpen = () => void dispatch(ia.setShowDrawer({ showDrawer: true }));
  const handleToggleSearchItems = () => void dispatch(ia.toggleSearchItems());
  useEffect(() => {
    dispatch(ia.setShowDrawer({ showDrawer: smUp }));
  }, [smUp]);
  const classes = useStyles({ showSearchItems });
  return (
    <div
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: showDrawer,
        [classes.drawerClose]: !showDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: showDrawer,
          [classes.drawerClose]: !showDrawer,
        }),
      }}
    >
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
      <Divider />
      <ListSubheader className={classes.subheader}>Visible</ListSubheader>
      <ListItem button onClick={handleToggleSearchItems} className={classes.showSearch}>
        <ListItemIcon>
          <ListAltIcon className={classes.showSearch} />
        </ListItemIcon>
        <ListItemText
          primary={
            <div className={classes.pickText}>
              {`Pick Items`} <Switch color="primary" checked={showSearchItems} className={classes.visible} />
            </div>
          }
          primaryTypographyProps={{ variant: 'p' }}
          className={classes.text}
        />
      </ListItem>
      <Divider />
      <ListSubheader className={classes.subheader}>Actions</ListSubheader>
      <SidebarActions />
      <Divider />
    </div>
  );
}
