import { createSlice } from '@reduxjs/toolkit';
import extraReducers from './itemsThunkReducer';

const initialState = {
  selected: [],
  available: [],
  newGroup: [],
  groups: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setListAction(state, { payload }) {
      const { listName, list } = payload;
      state[listName] = list;
    },
    moveListItemAction(state, { payload }) {
      const { sourceName, destName, start, end } = payload;
      const [removed] = state[sourceName].splice(start, 1);
      state[destName].splice(end, 0, removed);
    },
    reorderListAction(state, { payload }) {
      const { sourceName, start, end } = payload;
      const [removed] = state[sourceName].splice(start, 1);
      state[sourceName].splice(end, 0, removed);
    },
  },
  extraReducers,
});

export default itemsSlice.reducer;
export const itemsActions = itemsSlice.actions;
