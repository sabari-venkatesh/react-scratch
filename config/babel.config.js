const pkg = require("../package.json");

module.exports = (api) => {
  // https://babeljs.io/docs/en/config-files#apicache
  // api.env("development") returns true if development environment
  api.cache.using(() => api.env("development"));
  return {
    presets: [
      // A Babel preset that can automatically determine the Babel plugins and polyfills
      // https://github.com/babel/babel-preset-env
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: pkg.browserslist[api.env()],
          },
          useBuiltIns: false,
          modules: false, // Needed for tree shaking to work.
          debug: false,
        },
      ],
      ["@babel/preset-react", { development: api.env("development") }]
    ],
    plugins: []
  }
};