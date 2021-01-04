import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function Item({ item, index }) {
  return (
    <Draggable draggableId={`drag-${item.id}`} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              padding: 8 * 2,
              margin: `0 0 ${8}px 0`,
              // change background colour if dragging
              background: snapshot.isDragging ? 'lightgreen' : 'grey',
              // styles we need to apply on draggables
              ...provided.draggableProps.style,
            }}
          >
            {item.name}
          </div>
        )
      }}
    </Draggable>
  )
}
