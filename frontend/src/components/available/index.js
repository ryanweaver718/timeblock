import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AvailableList from './AvailableList';
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
    zIndex: '1',
    marginTop: '-1px',
  },
  list: {
    flexBasis: '100%',
  },
  menu: {
    flexBasis: '100%',
  },
}));
export default function Index({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId] || [],
  }));
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Show All Priorities');
  return (
    <div className={classes.root}>
      <Menu className={classes.menu} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      <AvailableList className={classes.list} droppableId={droppableId} list={list} filter={filter} search={search} />
    </div>
  );
}
