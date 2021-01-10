import * as it from './itemsThunks';

const itemsThunkReducer = {
  [it.createUserItem.fulfilled]: (state, { payload: { item } }) => {
    state.available.push(item);
  },
  [it.getUser.fulfilled]: (state, { payload: { items } }) => {
    state.available = items;
  },
  [it.updateUserItem.fulfilled]: (state, { payload: { item } }) => {
    const idx = state.available.findIndex(({ id }) => id === item.id);
    state.available[idx] = item;
  },
  [it.deleteUserItem.fulfilled]: (state, { payload: { id } }) => {
    const idx = state.available.findIndex((item) => id === item.id);
    state.available.splice(idx, 1);
  },
  [it.createDay.fulfilled]: (state, { payload: { day } }) => {
    console.log('THE NEW DAY', day);
  },
  [it.updateDay.fulfilled]: (state, { payload: { day } }) => {
    console.log('THE UPDATE DAY', day);
  },
  [it.updateDayItem.fulfilled]: (state, { payload: { items } }) => {
    console.log('THE NEW DAY ITEMS', items);
  },
  [it.deleteDay.fulfilled]: (state, { payload: { date } }) => {
    console.log('deleted day', date);
  },
};

export default itemsThunkReducer;
