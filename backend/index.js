import { response } from './helpers'
import { DayModel, SavedDayModel, TaskModel } from './models'

export const createDay = async ({ body }) => {
  const { date, tasks } = JSON.parse(body)
  const day = await DayModel.create({ date, tasks })
  return response({ day })
}

export const createTask = async ({ body }) => {
  const { details, startTime, endTime, totalMinutes } = JSON.parse(body)
  const task = await TaskModel.create({ details, startTime, endTime, totalMinutes, totalMinutes })
  return response({ task })
}

export const createSavedDay = async ({ body }) => {
  const { name, tasks } = JSON.parse(body)
  const savedDay = await DayModel.create({ name, tasks })
  return response({ savedDay })
}

export const getTasks = async () => {
  let tasks = await TaskModel.scan().exec()
  return response({ tasks })
}

export const getSavedDays = async () => {
  let savedDays = await SavedDayModel.scan().exec()
  return response({ savedDays })
}
