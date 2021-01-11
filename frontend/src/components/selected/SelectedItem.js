import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import { makeStyles, withStyles } from '@material-ui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import ItemIcon from './ItemIcon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'



const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    width: '25%',
    backgroundColor: theme.palette.background.paper,
    //border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(() => ({
  item: ({ draggablePropsStyle }) => ({
    ...draggablePropsStyle,
  }),
  paper: {
    padding: '6px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

SelectedItem.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  currentTotalTime: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};
export default function SelectedItem({ item, provided, snapshot, currentTotalTime, index }) {
  const [isHovering, setIsHovering] = useState(false);
  const { startTime } = useSelector(({ items }) => ({ startTime: items.startTime }));
  const dispatch = useDispatch();
  const classes = useStyles({ draggablePropsStyle: provided.draggableProps.style });
  const calculatedTime = moment(startTime).add(parseInt(currentTotalTime), 'minutes').format('hh:mm a');

  const removeItem = () => {
    console.log('THE INDEX OF THIS ITEM IS:', index)
  dispatch(itemsActions.deleteItemAction({index})); 
  };
  const handleItemUpdate = (e) => {
    dispatch(itemsActions.updateSelectedItemTotalTimeAction({ id: item.id, totalMinutes: parseInt(e.target.value) }));
  };

  return (
    <TimelineItem
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={classes.item}
    >
      <TimelineOppositeContent>
        <Typography variant="body2" color="textSecondary">
          {calculatedTime}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <ItemIcon showInverseColor={isHovering || snapshot.isDragging} priority={item.priority} />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent>
        <Paper elevation={5} className={classes.paper}>
          <div>
          <IconButton onClick={removeItem}> 
          <DeleteIcon/>
          </IconButton>

          {/* Delete Button that sends dispatch inside reducer it wil be array.splice(index, 1) */}
            <BootstrapInput
              className={classes.margin}
              defaultValue="Naked input"
              inputProps={{ 'aria-label': 'naked' }}
              type="number"
              value={item.totalMinutes}
              onChange={handleItemUpdate}
              placeholder="min"
            />
          </div>
          <div>
            <Typography variant="h6" component="h1">
              {item.name}
            </Typography>
          </div>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}
