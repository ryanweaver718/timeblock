import ListItem from '@material-ui/core/ListItem';
import Typograhpy from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
// import { useDispatch } from 'react-redux';

Item.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
};
export default function Item({ item, provided, snapshot }) {
  const [isHovering, setIsHovering] = useState(false);
  const [totalMinutes, setTotalMinutes] = useState(item.totalMinutes)
  const { dragHandleProps, draggableProps, innerRef } = provided;
  const { isDragging } = snapshot;
  // const dispatch = useDispatch();
  let background = 'darkgrey';
  if (isDragging) background = 'lightgreen';
  else if (isHovering) background = 'white';
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
        height: `${Math.ceil(1*totalMinutes)}rem`,
        ...draggableProps.style,
      }}

    >
      <Typograhpy>{item.name}</Typograhpy> 
      <div style={{ flexGrow: 1 }} />
      <TextField
        variant="outlined"
        placeholder="minutes"
        type="number"
        value={totalMinutes}
        onChange={(e) => {
          setTotalMinutes(parseInt(e.target.value));
        }}
      />
    </ListItem>
  );
}
