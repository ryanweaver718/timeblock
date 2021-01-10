import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import { saveList } from 'store/items/itemsThunks';
import SelectedList from './SelectedList';
import SelectTime from './SelectTime';
Index.propTypes = {
  droppableId: PropTypes.string.isRequired,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    paddingRight: '3rem',
  },
  list: {
    flexBasis: '100%',
  },
}));


export default function Index({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId] || [],
  }));
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(itemsActions.clearDailyScheduleAction())
}
  const classes = useStyles();
  const handleSave = () => void dispatch(saveList());
  
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4">Daily Schedule</Typography>       
      
      <button onClick={handleClear}>clear</button>
      <SelectTime /> <IconButton onClick={handleSave}>
          <SaveIcon />
        </IconButton>
        </div>
      <SelectedList className={classes.list} droppableId={droppableId} list={list} />
    </div>
  );
}
