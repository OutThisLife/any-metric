const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  require('dotenv').config()
}

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const withPlugins = require('next-compose-plugins')
const typescript = require('@zeit/next-typescript')
const offline = require('next-offline')
const withImages = require('next-optimized-images')

module.exports = withPlugins(
  [
    [
      withImages,
      {
        types: ['jpeg', 'png', 'svg', 'ico']
      }
    ],
    typescript,
    [
      offline,
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
      isDev: dev
    },
    exportPathMap: async () => ({
      '/': { page: '/Dashboard', query: {} }
    })
  }
)
