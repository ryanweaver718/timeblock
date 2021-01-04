import propTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import Item from './Item';

DroppableList.propTypes = {
  droppableId: propTypes.string.isRequired,
};

export default function DroppableList({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId],
  }));
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
            padding: 8,
            width: 250,
          }}
        >
          {list.map((item, index) => (
            <Draggable key={item.id} draggableId={`drag-${item.id}`} index={index}>
              {(provided, snapshot) => <Item item={item} snapshot={snapshot} provided={provided} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
