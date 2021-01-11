import AvailableList from 'components/available';
import SelectedList from 'components/selected';
import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { initialize } from 'store/items/itemsThunks';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialize());
  }, []); //eslint-disable-line
  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const payload = {
      start: source.index,
      end: destination.index,
      sourceName: source.droppableId,
      destName: destination.droppableId,
    };
    // dispatch(
    //   source.droppableId === destination.droppableId ? ia.reorderListAction(payload) : ia.moveListItemAction(payload)
    // );
    dispatch(ia.reorderListAction(payload));
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexBasis: '20%' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <AvailableList droppableId="available" />
        </DragDropContext>
      </div>
      <div style={{ flexGrow: 1 }} />

      <div style={{ flexBasis: '70%' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <SelectedList droppableId="selected" />
        </DragDropContext>
      </div>
    </div>
  );
}
