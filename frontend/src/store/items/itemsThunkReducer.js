import * as it from './itemsThunks'

const itemsThunkReducer = {
  [it.addItemThunk.fulfilled]: (state, { payload: { item } }) => {
    state.selected.push(item)
  },
}

export default itemsThunkReducer
