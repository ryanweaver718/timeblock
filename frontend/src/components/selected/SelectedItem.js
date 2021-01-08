import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Typograhpy from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import { getItemColor } from '../utils';

const useStyles = makeStyles(() => ({
  item: ({ isHovering, isDragging, priority, draggablePropsStyle, totalMinutes }) => ({
    display: 'flex',
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,
    borderRadius: '10px',
    background: getItemColor(isDragging, isHovering, priority),
    height: `${Math.ceil(1 * totalMinutes) / 2}rem`,
    ...draggablePropsStyle,
  }),
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
  const classes = useStyles({
    isDragging: snapshot.isDragging,
    isHovering,
    draggablePropsStyle: provided.draggableProps.style,
    priority: item.priority,
  });

  const calculatedTime = moment(selectedTime).add(parseInt(currentTotalTime), 'minutes').format('hh:mm');

  const handleEdit = () => void setIsEditing(true);
  const saveChanges = async () => void setIsEditing(false);
  const handleItemUpdate = (e) => {
    dispatch(itemsActions.updateSelectedItemTotalTimeAction({ id: item.id, totalMinutes: parseInt(e.target.value) }));
  };

  return (
    <ListItem
      button
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={classes.item}
    >
      <Typograhpy variant="p" style={{ flexGrow: 1 }}>
        {calculatedTime}
      </Typograhpy>
      <Typograhpy varitant="h6" style={{ flexGrow: 1 }}>
        {item.name}
      </Typograhpy>
      <div style={{ flexGrow: 1 }} />
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
          {`Total Minutes ${item.totalMinutes}`}
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </div>
      )}
    </ListItem>
  );
}
