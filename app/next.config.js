const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  require('dotenv').config()
}

const withPlugins = require('next-compose-plugins')
const typescript = require('@zeit/next-typescript')
const offline = require('next-offline')
const withCSS = require('@zeit/next-css')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = withPlugins(
  [
    withCSS,
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
      isDev: dev,
      API_URL: `http://localhost:${process.env.PORT || 3000}}/graphql`
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|otf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      })

      return config
    },

    exportPathMap: async () => ({
      '/': { page: '/home', query: {} }
    })
  }
)
