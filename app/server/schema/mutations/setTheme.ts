import * as mongoose from 'mongoose'

import { Resolver } from '../types'

export default (async (_, { theme }: { theme: string }, { mongo }) => {
  await mongo.theme.updateOne(
    {
      _id: new mongoose.mongo.ObjectID('u&j8d%mGELBl')
    },
    {
      $set: { theme, updatedAt: new Date() }
    },
    { upsert: true }
  )

  return theme
}) as Resolver
