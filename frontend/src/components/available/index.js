import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import AvailableList from './AvailableList';

Index.propTypes = {
  droppableId: PropTypes.string.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    background: theme.palette.background.light,
    padding: `0.25rem `,
    zIndex: '1',
    marginTop: '-1px',
  },
  list: {
    flexBasis: '100%',
    justifySelf: 'flex-start',
  },
  menu: {
    flexBasis: '100%',
    justifySelf: 'flex-end',
  },
}));
export default function Index({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId] || [],
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AvailableList className={classes.list} droppableId={droppableId} list={list} />
    </div>
  );
}
