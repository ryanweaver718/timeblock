import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Item from '../Item';

AvailableList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};
AvailableList.defaultProps = {
  list: [],
};

export default function AvailableList({ droppableId, list }) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <List
          ref={provided.innerRef}
          style={{
            background: snapshot.isDraggingOver ? 'lightblue' : '	#E8E8E8',
            borderRadius: '10px',
            padding: 8,
            flexGrow: 1,
          }}
        >
          {list.map((item, index) => (
            <Draggable key={item.id} draggableId={`drag-${item.id}`} index={index}>
              {(provided, snapshot) => <Item item={item} snapshot={snapshot} provided={provided} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}
