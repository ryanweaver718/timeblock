import { createSlice } from '@reduxjs/toolkit'
import faker from 'faker'
import range from 'lodash/range'
import { v4 as uuid } from 'uuid'

const initialState = {
  selected: range(10).map(i => ({ id: uuid(), content: faker.commerce.department() })),
  available: range(10).map(i => ({ id: uuid(), content: faker.name.firstName() })),
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
})

export default itemsSlice.reducer
export const itemsActions = itemsSlice.actions
