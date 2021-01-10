import { model, Schema } from 'dynamoose'
import { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid'
const dynamo = new DynamoDB.DocumentClient()

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      hashKey: true,
    },
    items: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  {
    saveUnknown: true,
  }
)

const UserModel = model('user-items', UserSchema)

UserModel.methods.set('addItem', async function (userId, itemObject) {
  const itemId = uuid()
  const params = {
    TableName: this.Model.name,
    Key: { userId },
    UpdateExpression: `SET #items.#itemId = :v`,
    ExpressionAttributeNames: {
      '#items': 'items',
      '#itemId': itemId,
    },
    ExpressionAttributeValues: {
      ':v': itemObject,
    },
    ReturnValues: 'UPDATED_NEW',
  }
  const response = await dynamo.update(params).promise()
  return response.Attributes.items[itemId]
})

UserModel.methods.set('updateItem', async function (userId, itemId, itemFieldName, itemFieldValue) {
  const params = {
    TableName: this.Model.name,
    Key: { userId },
    UpdateExpression: `SET #items.#itemId.#itemKey = :v`,
    ExpressionAttributeNames: {
      '#items': 'items',
      '#itemId': itemId,
      '#itemKey': itemFieldName,
    },
    ExpressionAttributeValues: {
      ':v': itemFieldValue,
    },
    ReturnValues: 'ALL_NEW',
  }
  const response = await dynamo.update(params).promise()
  return response.Attributes.items[itemId]
})

UserModel.methods.set('deleteItem', async function (userId, itemId) {
  const userItems = (await this.get({ userId })).toJSON()
  delete userItems.items[itemId]
  await this.update({ userId }, { $SET: { items: userItems.items } })
  return itemId
})

UserModel.serializer.add('itemsToArray', {
  modify: (serialized, original) => {
    serialized.items = Object.entries(original.items || {})
      .map(([itemId, item]) => ({
        itemId,
        ...item,
      }))
      .sort((a, b) => b.priority - a.priority)
    return serialized
  },
})

UserModel.serializer.default.set('itemsToArray')

export default UserModel
