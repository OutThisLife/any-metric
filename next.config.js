require('dotenv').load()

const { withPlugins } = require('next-compose-plugins')
const typescript = require('@zeit/next-typescript')
const offline = require('next-offline')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = withPlugins(
  [
    typescript,
    [
      offline,
      {
        workboxOpts: {
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'networkFirst',
              options: {
                cacheName: 'https-calls',
                networkTimeoutSeconds: 15,
                expiration: {
                  maxEntries: 150,
                  maxAgeSeconds: 30 * 24 * 60 * 60
                },
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
    webpack(c) {
      const config = c

      config.module.rules.push(
        {
          test: /\.(css|scss)/,
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext]'
          }
        },
        {
          test: /\.(css|scss|svg)/,
          use: ['babel-loader', 'raw-loader']
        }
      )

      return config
    },

    exportPathMap() {
      return {
        '/': { page: '/' }
      }
    }
  }
)
