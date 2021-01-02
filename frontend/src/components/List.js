import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Item from './Item'
import propTypes from 'prop-types'

DroppableList.propTypes = {
  droppableId: propTypes.string.isRequired,
  list: propTypes.array.isRequired,
}
DroppableList.defaultProps = {
  list: [],
}
export default function DroppableList({ droppableId, list }) {
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
            <Item item={item} index={index} key={item.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
