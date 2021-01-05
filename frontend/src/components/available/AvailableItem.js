import ListItem from '@material-ui/core/ListItem';
import Typograhpy from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteItem } from 'store/items/itemsThunks';

Item.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
};
export default function Item({ item, provided, snapshot }) {
  const [isHovering, setIsHovering] = useState(false);
  const { dragHandleProps, draggableProps, innerRef } = provided;
  const { isDragging } = snapshot;
  const dispatch = useDispatch();
  let background = 'darkgrey';
  if (isDragging) background = 'lightgreen';
  else if (isHovering) background = 'grey';
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
        userSelect: 'none',
        padding: 8 * 2,
        margin: `0 0 ${8}px 0`,
        borderRadius: '10px',
        background,
        height: `${Math.ceil(1*item.totalMinutes)}rem`,
        ...draggableProps.style,
      }}
    >
      <Typograhpy>{item.name}</Typograhpy> {item.totalMinutes}
      <div style={{ flexGrow: 1 }} />
      <IconButton
        onClick={() => {
          dispatch(deleteItem({ id: item.id }));
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
