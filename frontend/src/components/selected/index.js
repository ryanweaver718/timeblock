import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SelectedList from './SelectedList';
import Typography from '@material-ui/core/Typography';
Index.propTypes = {
  droppableId: propTypes.string.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    alignItems: 'center',
    background: theme.palette.background.light,
    padding: `0.25rem `,
    boxShadow: '0px 0.5rem 0.5rem #0004',
    zIndex: '1',
    marginTop: '-1px',
    borderBottom: `1px solid lightblue`,
  },
  filterOn: {
    color: theme.palette.primary.main,
  },
  header: {
    flexBasis: '100%',
    padding: '1rem',
  },
  list: {
    flexBasis: '100%',
  },
}));
export default function Index({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId] || [],
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5">Daily Schedule</Typography>
      </div>

      <SelectedList className={classes.list} droppableId={droppableId} list={list} />
    </div>
  );
}
