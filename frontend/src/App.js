import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import DroppableList from 'components/List'
import { itemsActions as ia } from 'store/items/itemsReducer'

export default function App() {
  const { available, selected } = useSelector(({ items }) => ({
    available: items.available,
    selected: items.selected,
  }))

  const dispatch = useDispatch()

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return
    const payload = { start: source.index, end: destination.index, sourceName: source.droppableId }
    dispatch(
      source.droppableId === destination.droppableId
        ? ia.reorderListAction(payload)
        : ia.moveListItemAction({
            ...payload,
            destName: destination.droppableId,
          })
    )
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
