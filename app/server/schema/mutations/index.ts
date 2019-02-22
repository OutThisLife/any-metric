import { ObjectID } from 'bson'
import * as mongoose from 'mongoose'

import modify from './modify'
import remove from './remove'

export const convertId = (id: string) => ({
  _id: new mongoose.mongo.ObjectID(id)
})

export const convertIds = (ids: string[]): ObjectID[] =>
  ids.map(t => new mongoose.mongo.ObjectID(t))

export default {
  modify,
  remove
}
