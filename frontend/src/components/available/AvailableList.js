import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Item from '../Item'

AvailableList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  sort: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
}
AvailableList.defaultProps = {
  list: [],
}

export default function AvailableList({ droppableId, list, sort, search }) {
  console.log('the droppable list', list)
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <List
          ref={provided.innerRef}
          style={{
            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
            padding: 8,
            flexGrow: 1,
          }}
        >
          {list
            .filter(item => {
              return search ? item.name.toLowerCase().includes(search.toLowerCase()) : true
            })
            .sort((itemA, itemB) => {
              let a = itemA.name.toLowerCase()
              let b = itemB.name.toLowerCase()
              switch (sort) {
                case 'A-Z':
                  if (a > b) return 1
                  else if (b > a) return -1
                  break
                case 'Z-A':
                  if (a > b) return -1
                  else if (b > a) return 1
                  break
              }
              return 0
            })
            .map((item, index) => (
              <Draggable key={item.id} draggableId={`drag-${item.id}`} index={index}>
                {(provided, snapshot) => (
                  <Item item={item} snapshot={snapshot} provided={provided} />
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  )
}
