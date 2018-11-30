const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  require('dotenv').config()
}

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withPlugins = require('next-compose-plugins')
const typescript = require('@zeit/next-typescript')
const offline = require('next-offline')
const withCSS = require('@zeit/next-css')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = withPlugins(
  [
    withBundleAnalyzer,
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
      API_URL: `http://localhost:${process.env.PORT || 3000}/graphql`
    },
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: './bundles/client.html'
      }
    },
    webpack: config => {
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
      '/': { page: '/Home', query: {} }
    })
  }
)
