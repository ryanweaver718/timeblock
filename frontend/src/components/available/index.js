import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import propTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AvailableList from './AvailableList';
import Menu from './Menu';
Index.propTypes = {
  droppableId: propTypes.string.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    alignItems: 'center',
    background: theme.palette.background.light,
    padding: `0.25rem `,
    boxShadow: '0px 0.5rem 0.5rem #0004',
    zIndex: '1',
    marginTop: '-1px',
    borderBottom: `1px solid lightblue`,
  },
  filterOn: {
    color: theme.palette.primary.main,
  },
  header: {
    flexBasis: '100%',
    padding: '1rem',
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
  const [filter, setFilter] = useState('Show All');

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4">Available Items</Typography>
      </div>
      <Menu className={classes.menu} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      <AvailableList className={classes.list} droppableId={droppableId} list={list} search={search} />
    </div>
  );
}
