import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: {
    priorities: ['1', '2', '3', '4'],
    text: '',
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchText(state, { payload: { text } }) {
      state.search.text = text;
    },
    setSearchPriorities(state, { payload: { priority } }) {
      const idx = state.search.priorities.indexOf(priority);
      if (idx === -1) {
        state.search.priorities.push(priority);
      } else {
        state.search.priorities.splice(idx, 1);
      }
    },
  },
});
export default appSlice.reducer;
export const appActions = appSlice.actions;
