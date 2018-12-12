import { Product, Tag } from '@/server/schema/types'
import {
  compose,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'

export default (...funcs) =>
  compose<TagState & TagHandlers, {}>(
    funcs.shift(),
    withStateHandlers<TagState, TagHandlers, TagState>(
      ({ tags = [] }) => ({ tags }),
      {
        addTag: ({ tags }) => (tag: Tag) => {
          if (!tags.some(t => t._id === tag._id)) {
            tags.push(tag)
          }

          return { tags }
        },

        delTag: ({ tags }) => (tag: Tag) => {
          tags.splice(tags.findIndex(t => t._id === tag._id), 1)
          return { tags }
        },

        updateTag: ({ tags }) => (tag: Tag) => ({
          tags: tags.map(t => (t.title === tag.title ? tag : t))
        })
      }
    ),
    ...funcs
  )

export interface TagState {
  tags?: Tag[]
  item?: Product
  updateItem?: (t: Tag[]) => Promise<any>
}

export interface TagHandlers extends StateHandlerMap<TagState> {
  addTag?: StateHandler<TagState>
  delTag?: StateHandler<TagState>
  updateTag?: StateHandler<TagState>
}
