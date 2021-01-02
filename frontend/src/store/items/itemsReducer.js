import { createSlice } from '@reduxjs/toolkit'
import faker from 'faker'
import range from 'lodash/range'
import extraReducers from './itemsThunkReducer'
import { v4 as uuid } from 'uuid'

const getList = type => range(10).map(i => ({ id: uuid(), content: type() }))

const initialState = {
  selected: [],
  available: [],
  newGroup: [],
  groups: [],
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setListAction(state, { payload }) {
      const { listName, list } = payload
      state[listName] = list
    },
    moveListItemAction(state, { payload }) {
      const { sourceName, destName, start, end } = payload
      const [removed] = state[sourceName].splice(start, 1)
      state[destName].splice(end, 0, removed)
    },
    reorderListAction(state, { payload }) {
      const { sourceName, start, end } = payload
      const [removed] = state[sourceName].splice(start, 1)
      state[sourceName].splice(end, 0, removed)
    },
  },
  extraReducers,
})

export default itemsSlice.reducer
export const itemsActions = itemsSlice.actions
