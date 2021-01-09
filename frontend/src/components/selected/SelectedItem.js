import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import ItemIcon from './ItemIcon';

const useStyles = makeStyles(() => ({
  item: ({ draggablePropsStyle }) => ({
    ...draggablePropsStyle,
  }),
  paper: {
    padding: '6px 16px',
  },
}));

SelectedItem.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  currentTotalTime: PropTypes.number.isRequired,
};
export default function SelectedItem({ item, provided, snapshot, currentTotalTime }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { selectedTime } = useSelector(({ items }) => ({ selectedTime: items.selectedTime }));
  const dispatch = useDispatch();
  const classes = useStyles({ draggablePropsStyle: provided.draggableProps.style });

  const calculatedTime = moment(selectedTime).add(parseInt(currentTotalTime), 'minutes').format('hh:mm a');

  const handleEdit = () => void setIsEditing(true);
  const saveChanges = async () => void setIsEditing(false);
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
        <ItemIcon isHovering={isHovering} isDragging={snapshot.isDragging} priority={item.priority} />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent>
        <Paper elevation={5} className={classes.paper}>
          <Typography variant="h6" component="h1">
            {item.name}
          </Typography>
          {isEditing ? (
            <div>
              <TextField
                variant="outlined"
                placeholder="minutes"
                type="number"
                value={item.totalMinutes}
                onChange={handleItemUpdate}
              />
              <IconButton onClick={saveChanges}>
                <DoneIcon />
              </IconButton>
            </div>
          ) : (
            <div>
              {`${item.totalMinutes} min.`}
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </div>
          )}
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}
