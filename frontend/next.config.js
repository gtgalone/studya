const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')

module.exports = withTypescript(
  withCSS({
    webpack(config) {
      if (process.env.ANALYZE) {
        config.plugins.push(new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        }))
      }
      return config
    },
    cssModules: true,
    serverRuntimeConfig: { // Will only be available on the server side
    },
    publicRuntimeConfig: { // Will be available on both server and client
    }
  })
)
