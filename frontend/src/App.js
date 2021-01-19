import makeStyles from '@material-ui/core/styles/makeStyles';
import AvailableList from 'components/available';
import SelectedList from 'components/selected';
import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { initialize } from 'store/items/itemsThunks';
import AddItemModal from './components/AddItemModal';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    // flexGrow: 1,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainItems: () => ({
    minHeight: '100%',
    // flexBasis: showSearchItems ? '70%' : '100%',
    overflowY: 'scroll',
    flexGrow: 1,
    // maxWidth: '25%',
    // overflowX: 'visible',
  }),
  searchItems: () => ({
    minHeight: '100%',
    // flexBasis: showSearchItems ? '30%' : '0%',
    overflowY: 'scroll',
    // overflowX: 'visible',
    flexGrow: 1,
    // maxWidth: '25%',
  }),
  openSearch: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  closeSearch: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialize());
  }, []); //eslint-disable-line
  const { isOpen, showSearchItems } = useSelector(({ items }) => ({
    isOpen: items.itemModal.isOpen,
    showSearchItems: items.showSearchItems,
  }));

  const classes = useStyles({ showSearchItems });
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
      <div
        className={clsx(classes.searchItems, {
          [classes.openSearch]: showSearchItems,
          [classes.closeSearch]: !showSearchItems,
        })}
      >
        <AvailableList droppableId="available" />
      </div>
      <div className={classes.mainItems}>
        <DragDropContext onDragEnd={onDragEnd}>
          <SelectedList droppableId="selected" />
        </DragDropContext>
      </div>
      {isOpen && <AddItemModal />}
    </div>
  );
}
