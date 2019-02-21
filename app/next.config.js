const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')
const withImages = require('next-optimized-images')
const withWorkers = require('@zeit/next-workers')

module.exports = withPlugins(
  [
    withTypescript,
    withWorkers,
    [
      withImages,
      {
        types: ['jpeg', 'png', 'svg', 'ico']
      }
    ],
    [
      withOffline,
      {
        workboxOpts: {
          runtimeCaching: [
            {
              urlPattern: /\.([A-z]{2,4})$/,
              handler: 'cacheFirst'
            },
            {
              urlPattern: /graphql$/,
              handler: 'networkFirst',
              options: {
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      },
      ['!', PHASE_DEVELOPMENT_SERVER]
    ]
  ],
  {
    useFileSystemPublicRoutes: false,
    publicRuntimeConfig: {
      isDev: process.NODE_ENV !== 'production'
    },
    exportPathMap: async () => ({
      '/': { page: '/Dashboard', query: {} }
    })
  }
)
