import { createSlice } from '@reduxjs/toolkit';
import extraReducers from './itemsThunkReducer';
import moment from 'moment';

const initialState = {
  selected: [],
  available: [],
  newGroup: [],
  groups: [],
  selectedDate: moment().toDate(),
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
    updateSelectedDateAction(state, { payload }) {
      const { date } = payload;
      state.selectedDate = moment(date).toDate();
    },
    updateSelectedItemTotalTimeAction(state, { payload }) {
      const { id, totalMinutes } = payload;
      state.selected = state.selected.map((item) => {
        if (item.id === id) {
          item.totalMinutes = totalMinutes;
        }
        return item;
      });
    },
  },
  extraReducers,
});

export default itemsSlice.reducer;
export const itemsActions = itemsSlice.actions;
