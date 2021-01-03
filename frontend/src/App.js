import ItemForm from 'components/ItemForm'
import AvailableList from 'components/available'
import DroppableList from 'components/List'
import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { itemsActions as ia } from 'store/items/itemsReducer'
import { getItems } from 'store/items/itemsThunks'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getItems())
    //eslint-disable-next-line
  }, [])
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
    <>
      <ItemForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: '33%' }}>
            <AvailableList droppableId="available" />
          </div>
          <div style={{ flexBasis: '33%' }}>
            <DroppableList droppableId="selected" />
          </div>
          <div style={{ flexBasis: '33%' }}>
            <DroppableList droppableId="newGroup" />
          </div>
        </div>
      </DragDropContext>
    </>
  )
}
