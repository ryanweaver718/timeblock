import AvailableList from 'components/available';
import SelectedList from 'components/selected';
import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { initialize } from 'store/items/itemsThunks';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'stretch',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    minHeight: '100%',
    overflowY: 'scroll',
  },
}));
export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialize());
  }, []); //eslint-disable-line
  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    dispatch(
      ia.reorderListAction({
        start: source.index,
        end: destination.index,
        sourceName: source.droppableId,
        destName: destination.droppableId,
      })
    );
  };

  return (
    <div className={classes.root}>
      <AvailableList droppableId="available" className={classes.menu} />
      <div className={classes.main}>
        <div className={classes.list}>
          <DragDropContext onDragEnd={onDragEnd}>
            <SelectedList droppableId="selected" />
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
