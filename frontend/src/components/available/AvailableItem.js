import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Typograhpy from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
const useStyles = makeStyles((theme) => ({
  item: ({ priority, draggablePropsStyle }) => ({
    display: 'flex',
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,
    borderRadius: '10px',
    border: `.15rem solid ${theme.palette.priorities[priority].main}`,
    '&:hover': {
      backgroundColor: theme.palette.priorities[priority].main,
    },
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

  const classes = useStyles({
    priority: item.priority,
  });
  const handleOpenItemModal = () => void dispatch(ia.setItemModal({ item, isOpen: true, isEditingItem: true }));
  const handleAddItem = () => void dispatch(ia.addToSelected({ item }));

  return (
    <ListItem
      button
      className={classes.item}
      onClick={handleAddItem}
      onDoubleClick={() => {
        console.log('d');
      }}
    >
      <IconButton onClick={handleOpenItemModal}>
        <EditIcon />
      </IconButton>
      <Typograhpy>{item.name}</Typograhpy>
      <div style={{ flexGrow: 1 }} />
    </ListItem>
  );
}
