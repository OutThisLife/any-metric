import { Product, Tag } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import gql from 'graphql-tag'
import { ChildProps, DataProps, graphql } from 'react-apollo'
import {
  compose,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'

export const getProducts = () =>
  graphql<{}, { results: Product[] }>(
    gql`
      query GetProduct($query: Pagination!) {
        results: products(query: $query) {
          _id
          createdAt
          slug
          image
          title
          tags
          price
          shipping
          qty
          bids
        }
      }
    `,
    {
      options: ({ pagination }: any) => ({
        variables: {
          query: pagination || {
            offset: 0,
            limit: 25
          }
        }
      }),
      props: ({ data: { results = [], ...data } }) => ({
        data,
        results
      })
    }
  )

// ------------------------------------------------

export const getTags = () =>
  compose<TagState & TagHandlers, {}>(
    graphql<{}, { tags: Tag[] }>(
      gql`
        {
          tags {
            _id
            title
            slug
            total
          }
        }
      `,
      {
        props: ({ data: { tags = [], ...data } }) => ({
          data,
          initialTags: tags
        })
      }
    ),
    withStateHandlers<TagState, TagHandlers>(
      ({ initialTags = [] }: { initialTags: Tag[] }) => ({ tags: initialTags }),
      {
        addTag: ({ tags }) => (tag: Tag) => {
          if (!tags.find(t => shallowEqual(t, tag))) {
            tags.push(tag)
          }

          return { tags }
        },

        delTag: ({ tags }) => (tag: Tag) => {
          if (
            window.confirm(
              'Are you sure you want to delete this tag? All references will be lost.'
            )
          ) {
            tags.splice(tags.findIndex(t => t === tag), 1)
            return { tags }
          }
        }
      }
    )
  )

export interface TagState {
  tags?: Tag[]
  initialTags?: Tag[]
}

export interface TagHandlers extends StateHandlerMap<TagState> {
  addTag?: StateHandler<TagState>
  delTag?: StateHandler<TagState>
}

// ------------------------------------------------

export const getTheme = () =>
  graphql<
    {},
    { theme: string },
    DataProps<{ theme: string }>,
    ChildProps<BaphoTheme>
  >(
    gql`
      {
        theme
      }
    `,
    {
      props: ({ data: { theme } }) => ({ theme: JSON.parse(theme) })
    }
  )
