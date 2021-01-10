import AvailableList from 'components/available';
import SelectedList from 'components/selected';
import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { getUser } from 'store/items/itemsThunks';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser({ userId: 'test123' }));
  }, []); //eslint-disable-line
  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const payload = {
      start: source.index,
      end: destination.index,
      sourceName: source.droppableId,
      destName: destination.droppableId,
    };
    dispatch(
      source.droppableId === destination.droppableId ? ia.reorderListAction(payload) : ia.moveListItemAction(payload)
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: '25%' }}>
            <AvailableList droppableId="available" />
          </div>
          <div style={{ flexBasis: '75%' }}>
            <SelectedList droppableId="selected" />
          </div>
        </div>
      </DragDropContext>
    </>
  );
}
