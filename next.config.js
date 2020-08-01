const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
module.exports = withSass({
  cssModules: true,
  ...withCss({
    webpack: function (config, { isServer }) {
      return config
    }
  })
})
