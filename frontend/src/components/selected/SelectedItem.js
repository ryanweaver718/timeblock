import ListItem from '@material-ui/core/ListItem';
import Typograhpy from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import moment from 'moment';

SelectedItem.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  currentTotalTime: PropTypes.number.isRequired,
};
export default function SelectedItem({ item, provided, snapshot, currentTotalTime }) {
  const [isHovering, setIsHovering] = useState(false);
  const { selectedDate } = useSelector(({ items }) => ({ selectedDate: items.selectedDate }));
  const { dragHandleProps, draggableProps, innerRef } = provided;
  const { isDragging } = snapshot;
  const dispatch = useDispatch();
  let background = 'darkgrey';
  if (isDragging) background = 'lightgreen';
  else if (isHovering) background = 'white';
  const calculatedTime = moment(selectedDate).add(parseInt(currentTotalTime), 'minutes').format('hh:mm');
  return (
    <ListItem
      button
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        userSelect: 'none',
        padding: 8 * 2,
        margin: `0 0 ${8}px 0`,
        borderRadius: '10px',
        background,
        height: `${Math.ceil(1 * item.totalMinutes) / 2}rem`,
        ...draggableProps.style,
      }}
    >
      <Typograhpy variant="p" style={{ flexGrow: 1 }}>
        {calculatedTime}
      </Typograhpy>
      <Typograhpy varitant="h6" style={{ flexGrow: 1 }}>
        {item.name}
      </Typograhpy>
      <div style={{ flexGrow: 1 }} />

      <TextField
        variant="outlined"
        placeholder="minutes"
        type="number"
        value={item.totalMinutes}
        onChange={(e) => {
          dispatch(
            itemsActions.updateSelectedItemTotalTimeAction({ id: item.id, totalMinutes: parseInt(e.target.value) })
          );
        }}
      />
    </ListItem>
  );
}
