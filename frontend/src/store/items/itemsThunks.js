import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, put, del } from 'store/utils'

const ct = (action, callback) => createAsyncThunk(`items/thunk/${action}`, callback)

export const createItem = ct('createItem', async (payload, thunkAPI) => {
  const { item } = await post('/item', payload)
  return { item }
})

export const getItems = ct('getItems', async () => {
  const { items } = (await get('/items')) || []
  return { items }
})

export const updateItem = ct('updateItems', async payload => {
  const { id, name, details, totalMinutes } = payload
  const { item } = put(`/item?id=${id}`, { name, details, totalMinutes })
  return { item }
})

export const deleteItem = ct('deleteItem', async payload => {
  const { id } = payload
  await del(`/item?id=${id}`)
  return { id }
})
