import propTypes from 'prop-types'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import Item from './AvailableItem'
import TextField from '@material-ui/core/TextField'

AvailableList.propTypes = {
  droppableId: propTypes.string.isRequired,
  list: propTypes.array.isRequired,
}

export default function AvailableList({ droppableId, list }) {
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
