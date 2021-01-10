import { DynamoDB } from 'aws-sdk'
import { response } from './helpers'
import isArray from 'lodash/isArray'
import UserModel from './models/User'
import DayModel from './models/Day'
const dynamo = new DynamoDB.DocumentClient()

export const getUser = async ({ queryStringParameters }) => {
  const { userId } = queryStringParameters
  let user = await UserModel.get({ userId })
  if (!user) {
    user = await UserModel.create({ userId })
  }
  user = user.serialize()

  return response({ user })
}
export const createUserItem = async ({ body, queryStringParameters }) => {
  const { userId } = queryStringParameters
  const { totalMinutes, name, priority } = JSON.parse(body)
  const item = await UserModel.addItem(userId, {
    name,
    totalMinutes,
    priority,
  })
  return response({ item })
}
export const updateItem = async ({ body, queryStringParameters }) => {
  const { id, userId = 'test123' } = queryStringParameters
  const { fieldName, fieldValue } = JSON.parse(body)
  const item = await UserModel.updateItem(userId, id, fieldName, fieldValue)
  return response({ item })
}

export const deleteItem = async ({ queryStringParameters }) => {
  const { id, userId = 'test123' } = queryStringParameters
  const deletedId = await UserModel.deleteItem(userId, id)
  return response({ success: true, id: deletedId })
}

export const createDay = async ({ body }) => {
  const { items, startTime, date, userId = 'test123' } = JSON.parse(body)
  const day = (await DayModel.create({ userId, date, startTime, items })).serialize()
  return response({ day })
}

export const updateDayStartTime = async ({ body }) => {
  const { startTime, userId, date } = JSON.parse(body)
  const day = await DayModel.update({ userId, date }, { startTime })
  return { day }
}

export const updateDayItem = async ({ body }) => {
  const { date, dynamoIndex, fieldKey, fieldValue, userId = 'test123' } = JSON.parse(body)
  const allUserItems = await DayModel.updateItem(userId, date, dynamoIndex, fieldKey, fieldValue)
  return { items: allUserItems }
}

export const saveList = async () => {
  const userId = 'test123'
  const date = '2021-01-10'

  const items = await DayModel.updateItem(userId, date, 0, 'completed', false)
  console.log('items', items)

  // const day = await DayModel.create({
  //   userId,
  //   date: '2021-01-10',
  //   items: [{ id: '123', name: 'run', totalMinutes: '25', priority: '4', completed: false }],
  // })
  const day = (await DayModel.get({ userId, date })).serialize()
  console.log('day', day)
}
