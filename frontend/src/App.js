import DroppableList from 'components/List'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { itemsActions as ia } from 'store/items/itemsReducer'
import { createNewItem } from 'store/items/itemsThunks'

export default function App() {
  const dispatch = useDispatch()

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return
    const payload = {
      start: source.index,
      end: destination.index,
      sourceName: source.droppableId,
      destName: destination.droppableId,
    }
    dispatch(
      source.droppableId === destination.droppableId
        ? ia.reorderListAction(payload)
        : ia.moveListItemAction(payload)
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <button
        onClick={() => {
          dispatch(addItemThunk())
        }}
      >
        Click
      </button>
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: '33%' }}>
          <DroppableList droppableId="available" />
        </div>
        <div style={{ flexBasis: '33%' }}>
          <DroppableList droppableId="selected" />
        </div>
        <div style={{ flexBasis: '33%' }}>
          <DroppableList droppableId="temp" />
        </div>
      </div>
    </DragDropContext>
  )
}
