import { model, Schema } from 'dynamoose'

const ItemSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: String,
  details: String,
  totalMinutes: String,
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

// const DaySchema = new Schema({
//   type: {
//     hashKey: true,
//     type: String,
//     default: 'day',
//   },
//   date: {
//     rangeKey: true,
//     type: String,
//   },
//   tasks: {
//     type: Array,
//     schema: [TaskSchema],
//   },
// })

// export const DayModel = model('day', DaySchema)
export const ItemGroupModel = model('', ItemGroupSchema)
export const ItemModel = model('items', ItemSchema)
