import { createAsyncThunk } from '@reduxjs/toolkit'
const ct = (action, callback) => createAsyncThunk(`items/thunk/${action}`, callback)

const testPromise = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: '123123123123', content: 'I AM A BIRD HELLO' })
    }, 3000)
  })

export const addItemThunk = ct('createItem', async (payload, thunkAPI) => {
  let newItem = await testPromise()
  return { item: newItem }
})
