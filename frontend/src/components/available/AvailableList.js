import PropTypes from 'prop-types'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import Item from './AvailableItem'
import TextField from '@material-ui/core/TextField'

AvailableList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  shouldUseSort: PropTypes.bool.isRequired,
  setShouldUseSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
}
AvailableList.defaultProps = {
  list: [],
}

export default function AvailableList({
  droppableId,
  list,
  sort,
  search,
  shouldUseSort,
  setShouldUseSort,
}) {
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
              if (!shouldUseSort) return 0
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
              <Item item={item} index={index} key={item.id} setShouldUseSort={setShouldUseSort} />
            ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  )
}
