import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, del } from 'store/utils';
import moment from 'moment';

const ct = (action, callback) => createAsyncThunk(`items/thunk/${action}`, callback);

export const createUserItem = ct('createUserItem', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState();
  const { name, totalMinutes, priority } = payload;
  const { item } = await post(`/user-item?userId=${userId}`, { name, totalMinutes, priority });
  console.log('NEWLY CREATED ITEM', item);
  return { item };
});

export const getUser = ct('getUser', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState();
  const { user } = (await get(`/user?userId=${userId}`)) || {};
  return { items: user.items };
});

export const updateUserItem = ct('updateUserItem', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState();
  const { fieldName, fieldValue, id } = payload;
  const { item } = await put(`/item?id=${id}&userId=${userId}`, { fieldName, fieldValue });
  return { item };
});

export const deleteUserItem = ct('deleteUserItem', async (payload, thunkAPI) => {
  const { id } = payload;
  const { userId } = thunkAPI.getState();
  await del(`/user-item?id=${id}&userId=${userId}`);
  return { id };
});

export const createDay = ct('createDay', async (payload, thunkAPI) => {
  const { selected, selectedDate, selectedTime, userId } = thunkAPI.getState();
  const { day } = await post(`/day?userId=${userId}`, {
    items: selected,
    date: moment(selectedDate).format('YYYY-MM-DD'),
    startTime: selectedTime,
  });
  return { day };
});

export const updateDay = ct('updateDay', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState();
  const { fieldName, fieldValue, date } = payload;
  const { day } = await put(`/day?userId=${userId}`, { date, fieldName, fieldValue });
  return { day };
});

export const updateDayItem = ct('updateDayItem', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState();
  const { date, dynamoIndex, fieldName, fieldValue } = payload;
  const { items } = await put(`/day-item?userId=${userId}`, { date, dynamoIndex, fieldName, fieldValue });
  return { items };
});

export const deleteDay = ct('deleteDay', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState();
  const { date } = payload;
  await del(`/day?date=${date}&userId=${userId}`);
  return { date };
});

export const test = ct('test', async (payload, thunkAPI) => {
  const { userId, selected } = thunkAPI.getState();
  const resp = await post(`/test?userId=${userId}`, { selected });
  console.log('RESPONSE TEST', resp);
});
