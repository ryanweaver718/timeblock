import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import extraReducers from './itemsThunkReducer';

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
    addToSelected(state, { payload: { item } }) {
      state.selected.push({ ...item, dayItemId: uuid() });
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
    updateSelectedItemTotalTimeAction(state, { payload: { dayItemId, type, number, setType } }) {
      number = parseInt(number);
      for (const item of state.selected) {
        if (item.dayItemId === dayItemId) {
          const minutes = parseInt(item.totalMinutes);
          if (setType === 'add') {
            item.totalMinutes = Math.max(minutes + (type === 'hours' ? number * 60 : number), 0).toString();
          } else if (setType === 'set') {
            let currentMinutes = minutes % 60;
            let currentHours = Math.floor(minutes / 60);
            item.totalMinutes = (type === 'hours'
              ? currentMinutes + number * 60
              : currentHours * 60 + number
            ).toString();
          }
        }
      }
    },
  },
  extraReducers,
});
export default itemsSlice.reducer;
export const itemsActions = itemsSlice.actions;
