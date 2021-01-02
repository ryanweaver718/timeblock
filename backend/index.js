import { pickDefined, response } from './helpers'
import { ItemGroupModel, ItemModel } from './models'
import { v4 as uuid } from 'uuid'
import pickBy from 'lodash/pickBy'

export const createItem = async ({ body }) => {
  const { details, totalMinutes, name } = JSON.parse(body)
  const item = await ItemModel.create({
    id: uuid(),
    name,
    details,
    totalMinutes,
  })
  return response({ item })
}

export const getItems = async () => {
  let items = await ItemModel.scan().exec()
  return response({ items })
}

export const updateItem = async ({ body, queryStringParameters }) => {
  const { id } = queryStringParameters
  const { name, details, totalMinutes } = JSON.parse(body)
  const item = await ItemModel.update({ id }, pickDefined({ name, details, totalMinutes }))
  return response({ item })
}

export const deleteItem = async ({ queryStringParameters }) => {
  const { id } = queryStringParameters
  await ItemModel.delete({ id })
  return response({ success: true })
}

export const getItemGroups = async () => {
  const groups = await ItemGroupModel.scan().exec()
  return response({ groups })
}

export const createItemGroup = async ({ body }) => {
  const { itemIds, name, details } = JSON.parse(body)
  const group = await ItemGroupModel.create({ id: uuid(), itemIds, name, details })
  return response({ group })
}
