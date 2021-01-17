import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AvailableList from './AvailableList';
import { itemsActions as ia } from 'store/items/itemsReducer';
import Menu from './Menu';

Index.propTypes = {
  droppableId: PropTypes.string.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    background: theme.palette.background.light,
    padding: `0.25rem `,
    // boxShadow: '0px 0.5rem 0.5rem #0004',
    zIndex: '1',
    marginTop: '-1px',
    borderBottom: `1px solid lightblue`,
  },
  filterOn: {
    color: theme.palette.primary.main,
  },
  header: {
    flexBasis: '100%',
    alignItems: 'center',
    padding: '1rem',
    display: 'flex',
  },
  list: {
    flexBasis: '100%',
  },
  menu: {
    flexBasis: '100%',
  },
  addButton: {
    fontSize: '2rem',
    color: 'blue',
  },
}));
export default function Index({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId] || [],
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Show All Priorities');
  const handleOpenModal = () => dispatch(ia.setItemModal({ isOpen: true }));
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <IconButton onClick={handleOpenModal}>
          <AddCircleOutlineIcon className={classes.addButton} />
        </IconButton>
      </div>
      <Menu className={classes.menu} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      <AvailableList className={classes.list} droppableId={droppableId} list={list} filter={filter} search={search} />
    </div>
  );
}
