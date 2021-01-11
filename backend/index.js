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
export const updateUserItem = async ({ body, queryStringParameters }) => {
  const { id, userId } = queryStringParameters
  const { fieldName, fieldValue } = JSON.parse(body)
  const item = await UserModel.updateItem(userId, id, fieldName, fieldValue)
  return response({ item })
}

export const deleteUserItem = async ({ queryStringParameters }) => {
  const { id, userId } = queryStringParameters
  const deletedId = await UserModel.deleteItem(userId, id)
  return response({ success: true, id: deletedId })
}

export const createDay = async ({ body, queryStringParameters }) => {
  const { userId } = queryStringParameters
  const { items, startTime, date } = JSON.parse(body)
  const day = (await DayModel.create({ userId, date, startTime, items })).serialize()
  return response({ day })
}

export const updateDay = async ({ body, queryStringParameters }) => {
  const { userId } = queryStringParameters
  const { fieldName, fieldValue, date } = JSON.parse(body)
  if (fieldName !== 'startTime') throw Error('Field Name Not Allowed')
  const day = await DayModel.update({ userId, date }, { [fieldName]: fieldValue })
  return { day }
}

export const updateDayItem = async ({ body, queryStringParameters }) => {
  const { userId } = queryStringParameters
  const { date, dynamoIndex, fieldName, fieldValue } = JSON.parse(body)
  const allUserItems = await DayModel.updateItem(userId, date, dynamoIndex, fieldName, fieldValue)
  return { items: allUserItems }
}

export const deleteDay = async ({ queryStringParameters }) => {
  const { userId, date } = queryStringParameters
  await DayModel.delete({ userId, date })
  return response({ date })
}

export const test = async () => {
  const userId = 'test123'
  const date = '2021-01-10'
  const items = await DayModel.updateItem(userId, date, 0, 'completed', false)
  console.log('items', items)
  const day = (await DayModel.get({ userId, date })).serialize()
  console.log('day', day)
}
