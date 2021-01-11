import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Item from './AvailableItem';
import has from 'lodash/has';
import { priorities } from '../../constants';
import invert from 'lodash/invert';

const invertedPriorities = invert(priorities);

AvailableList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};
AvailableList.defaultProps = {
  list: [],
};

export default function AvailableList({ droppableId, list, search, filter }) {
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
          {list
            .filter((item) => {
              let showItem = true;
              if (search) {
                showItem = item.name.toLowerCase().includes(search.toLowerCase());
              }
              if (has(invertedPriorities, filter)) {
                showItem = invertedPriorities[filter] === item.priority;
              }
              return showItem;
            })
            .map((item, index) => (
              <Draggable key={item.id} draggableId={`drag-${item.id}`} index={index}>
                {(provided, snapshot) => <Item item={item} snapshot={snapshot} provided={provided} index={index}/>}
              </Draggable>
            ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}
