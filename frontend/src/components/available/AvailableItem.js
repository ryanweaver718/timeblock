import ListItem from '@material-ui/core/ListItem';
import Typograhpy from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserItem } from 'store/items/itemsThunks';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
  item: ({ showInverseColor, priority, draggablePropsStyle }) => ({
    display: 'flex',
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,
    borderRadius: '10px',
    border: `.15rem solid ${theme.palette.priorities[priority].main}`,
    background: showInverseColor ? 'white' : theme.palette.priorities[priority].main,
    height: '1rem',
    ...draggablePropsStyle,
  }),
}));

Item.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
};
export default function Item({ item, provided, snapshot }) {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const showInverseColor = snapshot.isDragging || isHovering;
  const classes = useStyles({
    showInverseColor,
    draggablePropsStyle: provided.draggableProps.style,
    priority: item.priority,
  });
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
      <Typograhpy>{item.name}</Typograhpy>
      <div style={{ flexGrow: 1 }} />
      <IconButton onClick={() => void dispatch(deleteUserItem({ id: item.id }))}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
