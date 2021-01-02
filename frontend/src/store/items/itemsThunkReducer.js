import * as it from './itemsThunks'

const itemsThunkReducer = {
  [it.createItem.fulfilled]: (state, { payload: { item } }) => {
    state.selected.push(item)
  },
  [it.getItems.fulfilled]: (state, { payload: { items } }) => {
    state.available = items
  },
  [it.updateItem.fulfilled]: (state, { payload: { item } }) => {
    const idx = state.available.findIndex(({ id }) => id === item.id)
    state.available[idx] = item
  },
  [it.deleteItem.fulfilled]: (state, { payload: { id } }) => {
    const idx = state.available.findIndex(({ id }) => id === item.id)
    state.available.splice(idx, 1)
  },
}

export default itemsThunkReducer
