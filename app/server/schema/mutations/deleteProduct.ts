import * as mongoose from 'mongoose'

import { Resolver } from '../types'

export default (async (_, { input: { id } }, { mongo }) => {
  await mongo
    .collection('products')
    .deleteOne({ _id: new mongoose.mongo.ObjectID(id) })

  return true
}) as Resolver
