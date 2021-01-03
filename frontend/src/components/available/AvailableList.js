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
AvailableList.defaultProps = {
  list: [],
}

export default function AvailableList({ droppableId, list, sort, search }) {
  console.log('the droppable list', list)
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
                case 'Z-A':
                  if (a > b) return -1
                  else if (b > a) return 1
              }
              return 0
            })
            .map((item, index) => (
              <Item item={item} index={index} key={item.id} />
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
