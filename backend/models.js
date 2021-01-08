import { model, Schema } from 'dynamoose'

const ItemSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: String,
  details: String,
  totalMinutes: String,
  priority: { type: String, enum: ['1', '2', '3', '4'] },
})

const ItemGroupSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: String,
  details: String,
  itemIds: {
    type: Array,
    schema: [String],
  },
})

export const ItemGroupModel = model('item-group', ItemGroupSchema)
export const ItemModel = model('item', ItemSchema)
