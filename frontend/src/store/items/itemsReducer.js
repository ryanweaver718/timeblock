import { createReducer as cr } from '@reduxjs/toolkit'
import faker from 'faker'
import range from 'lodash/range'
import { v4 as uuid } from 'uuid'
import * as ia from './itemsActions'

const initialState = {
  lists: {
    selected: range(10).map(i => ({ id: uuid(), content: faker.commerce.department() })),
    avaialble: range(10).map(i => ({ id: uuid(), content: faker.name.firstname() })),
  },
}

export default cr(initialState, {
  [ia.setListAction]: (state, { payload: { listName, list } }) => ({
    ...state,
    lists: {
      [listName]: list,
    },
  }),
  [ia.moveListItemAction]: (
    state,
    { payload: { sourceListName, destinationListName, sourceIndex, destinationIndex } }
  ) => {
    let sourceList = [...state.lists[sourceListName]]
    let destinationList = [...state.lists[destinationListName]]
    const [removed] = sourceList.splice(sourceIndex, 1)
    destinationList.splice(destinationIndex, 0, removed)
    return {
      ...state,
      lists: {
        ...state.lists,
        [sourceListName]: sourceList,
        [destinationListName]: destinationList,
      },
    }
  },
  [ia.reorderListAction]: (state, { payload: { listName, startIndex, endIndex } }) => {
    const list = [...state.lists[listName]]
    const [removed] = list.splice(startIndex, 1)
    list.splice(endIndex, 0, removed)
    return {
      ...state,
      lists: {
        ...state.lists,
        [listName]: list,
      },
    }
  },
})
