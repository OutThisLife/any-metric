import { ObjectID } from 'bson'
import * as mongoose from 'mongoose'

import createProduct from './createProduct'
import createTag from './createTag'
import modify from './modify'
import remove from './remove'

export const convertId = (id: string) => ({
  _id: new mongoose.mongo.ObjectID(id)
})

export const convertIds = (ids: string[]): ObjectID[] =>
  ids.map(t => new mongoose.mongo.ObjectID(t))

export default {
  createProduct,
  createTag,
  modify,
  remove
}
