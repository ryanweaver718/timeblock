import { Schema, model } from 'dynamoose'

const TaskSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  details: String,
  startTime: String,
  endTime: String,
  totalMinutes: String,
})

const SavedDaySchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: String,
  tasks: {
    type: Array,
    schema: TaskSchema,
  },
})

const DaySchema = new Schema({
  type: {
    hashKey: true,
    type: String,
    default: 'day',
  },
  date: {
    rangeKey: true,
    type: String,
  },
  tasks: {
    type: Array,
    schema: [TaskSchema],
  },
})

export const DayModel = model('day', DaySchema)
export const SavedDayModel = model('saved-day', SavedDaySchema)
export const TaskModel = model('task', TaskSchema)
