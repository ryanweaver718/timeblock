import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Typograhpy from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import ItemModal from './ItemModal';
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
export default function Item({ item }) {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);
  const [open, setOpen] = useState(false);
  const showInverseColor = isHovering;
  const classes = useStyles({
    showInverseColor,
    priority: item.priority,
  });
  return (
    <ListItem
      button
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={classes.item}
      onDoubleClick={() => void dispatch(itemsActions.addToSelected({ item }))}
    >
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      {open && <ItemModal isOpen={open} handleClose={() => setOpen(false)} isEditingItem={true} item={item} />}
      <Typograhpy>{item.name}</Typograhpy>
      <div style={{ flexGrow: 1 }} />
    </ListItem>
  );
}
