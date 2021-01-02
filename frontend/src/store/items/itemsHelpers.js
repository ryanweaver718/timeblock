export const reorderList = (list, startIndex, endIndex) => {
  const newList = Array.from(list)
  const [removed] = newList.splice(startIndex, 1)
  newList.splice(endIndex, 0, removed)
  return newList
}

export const moveItemBetweenLists = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  console.log('move called', droppableSource, droppableDestination)
  const src = [...source]
  const dest = [...destination]
  const [removed] = src.splice(droppableSource.index, 1)
  dest.splice(droppableDestination.index, 0, removed)
  console.log(src, droppableSource)
  console.log(dest, droppableDestination)
  return {
    [droppableSource.droppableId]: src,
    [droppableDestination.droppableId]: dest,
  }
}
