import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from './AppBar';
import AppSidebar from './AppSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function AppWrapper({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar />
      <AppSidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
