import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typograhpy from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { itemsActions as ia } from 'store/items/itemsReducer';
const useStyles = makeStyles((theme) => ({
  item: ({ priority }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem',
    margin: `.1rem`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.priorities[priority].main,
    },
  }),
  title: {
    fontSize: theme.typography.pxToRem(12),
  },
  icon: {
    fontSize: theme.typography.pxToRem(15),
    marginRight: '.25rem',
  },
  priority: ({ priority }) => ({
    color: theme.palette.priorities[priority].main,
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
    <Paper elevation={4} className={classes.item} onClick={handleAddItem}>
      <TurnedInIcon className={classes.priority} />
      <IconButton onClick={handleOpenItemModal}>
        <EditIcon className={classes.icon} />
      </IconButton>
      <Typograhpy className={classes.title}>{item.name}</Typograhpy>
      <div style={{ flexGrow: 1 }} />
    </Paper>
  );
}
