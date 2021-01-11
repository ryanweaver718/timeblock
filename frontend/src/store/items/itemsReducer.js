import { createSlice } from '@reduxjs/toolkit';
import extraReducers from './itemsThunkReducer';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

const initialState = {
  selected: [],
  available: [],
  startTime: moment().toDate(),
  userId: 'test123',
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setListAction(state, { payload }) {
      const { listName, list } = payload;
      state[listName] = list;
    },
    addToSelected(state, { payload: { item } }) {
      state.selected.unshift(item);
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
      state.startTime = moment(date).toDate();
    },
    updateStartTime(state, { payload: { startTime } }) {
      state.startTime = startTime;
    },
    clearDailyScheduleAction(state) {
      state.selected = [];
    },
    addTemporaryItemAction(state, { payload: { name, totalMinutes, priority } }) {
      state.available.push({ id: uuid(), name, totalMinutes: parseInt(totalMinutes), priority });
    },
    updateSelectedItemTotalTimeAction(state, { payload: { id, totalMinutes } }) {
      for (const item of state.selected) {
        if (item.id === id) {
          item.totalMinutes = totalMinutes;
          break;
        }
      }
    },
  },
  extraReducers,
});
export default itemsSlice.reducer;
export const itemsActions = itemsSlice.actions;
