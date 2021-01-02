import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import DroppableList from 'components/List'
import { moveListItemAction, reorderListAction } from 'store/items/itemsActions'

export default function App() {
  const { available, selected } = useSelector(({ items }) => ({
    available: items.available,
    selected: items.selected,
  }))
  const dispatch = useDispatch()

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return
    if (source.droppableId === destination.droppableId) {
      dispatch(
        reorderListAction({
          listName: source.droppableId,
          startIndex: source.index,
          endIndex: destination.index,
        })
      )
    } else {
      dispatch(
        moveListItemAction({
          sourceListName: source.droppableId,
          destinationListName: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      )
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: '50%' }}>
          <DroppableList droppableId="available" list={available} />
        </div>
        <div style={{ flexBasis: '50%' }}>
          <DroppableList droppableId="selected" list={selected} />
        </div>
      </div>
    </DragDropContext>
  )
}
