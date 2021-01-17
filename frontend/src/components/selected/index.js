import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Header from './Header';
import SelectedList from './SelectedList';
import Menu from './Menu';

Index.propTypes = {
  droppableId: PropTypes.string.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'stretch',
    flexWrap: 'wrap',
    background: theme.palette.background.light,
    padding: `0.25rem `,
    // boxShadow: '0px 0.5rem 0.5rem #0004',
    zIndex: '1',
    marginTop: '-1px',
    // borderBottom: `1px solid lightblue`,
  },
  list: {
    flexBasis: '100%',
  },
  body: {
    display: 'flex',
    flexGrow: 1,

    // flexWrap: 'wrap',
  },
  bottomStretch: {
    flexBasis: '100%',
    display: 'flex',
    justifyContent: 'stretch',
    flexDirection: 'column',
    backgroundColor: 'blue',
  },
}));

export default function Index({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId] || [],
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.body}>
        <Menu />
        <SelectedList className={classes.list} droppableId={droppableId} list={list} />
      </div>
    </div>
  );
}
