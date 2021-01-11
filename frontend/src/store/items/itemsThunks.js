import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, del } from 'store/utils';
import moment from 'moment';

const ct = (action, callback) => createAsyncThunk(`items/thunk/${action}`, callback);

export const initialize = ct('initialize', async (payload, thunkAPI) => {
  const { userId = 'test123', selectedDate } = thunkAPI.getState().items;
  console.log('the userid', userId, selectedDate);
  const { user } = (await get(`/user?userId=${userId}`)) || {};
  const { day } = await get(`/day?userId=${userId}&date=${moment(selectedDate).format('YYYY-MM-DD')}`);
  console.log('day resp', day, user);

  return { items: user.items, day };
});
export const createUserItem = ct('createUserItem', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { name, totalMinutes, priority } = payload;
  const { item } = await post(`/user-item?userId=${userId}`, { name, totalMinutes, priority });
  console.log('NEWLY CREATED ITEM', item);
  return { item };
});

export const getUser = ct('getUser', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { user } = (await get(`/user?userId=${userId}`)) || {};
  return { items: user.items };
});

export const updateUserItem = ct('updateUserItem', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { fieldName, fieldValue, id } = payload;
  const { item } = await put(`/item?id=${id}&userId=${userId}`, { fieldName, fieldValue });
  return { item };
});

export const deleteUserItem = ct('deleteUserItem', async (payload, thunkAPI) => {
  const { id } = payload;
  const { userId } = thunkAPI.getState().items;
  await del(`/user-item?id=${id}&userId=${userId}`);
  return { id };
});

export const getDay = ct('getDay', async (payload, thunkAPI) => {
  const { selectedDate } = payload;
  const { userId } = thunkAPI.getState().items;
  console.log('THE SELECTEDAY', userId, selectedDate);
  const { day } = await get(`/day?userId=${userId}&date=${moment(selectedDate).format('YYYY-MM-DD')}`);
  console.log('DAYRESP', day);
  return { day, selectedDate };
});

export const createDay = ct('createDay', async (payload, thunkAPI) => {
  const { selected, selectedDate, selectedTime, userId } = thunkAPI.getState().items;
  const { day } = await post(`/day?userId=${userId}`, {
    items: selected,
    date: moment(selectedDate).format('YYYY-MM-DD'),
    startTime: moment(selectedTime).format('hh-mm') || '9',
  });
  return { day };
});

export const updateDay = ct('updateDay', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { fieldName, fieldValue, date } = payload;
  const { day } = await put(`/day?userId=${userId}`, { date, fieldName, fieldValue });
  return { day };
});

export const updateDayItem = ct('updateDayItem', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { date, dynamoIndex, fieldName, fieldValue } = payload;
  const { items } = await put(`/day-item?userId=${userId}`, { date, dynamoIndex, fieldName, fieldValue });
  return { items };
});

export const deleteDay = ct('deleteDay', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { date } = payload;
  await del(`/day?date=${date}&userId=${userId}`);
  return { date };
});

export const test = ct('test', async (payload, thunkAPI) => {
  const { userId, selected } = thunkAPI.getState().items;
  const resp = await post(`/test?userId=${userId}`, { selected });
  console.log('RESPONSE TEST', resp);
});
