const pkg = require('../package.json');

module.exports = ({ options: { env } }) => {

  const ISDEV = env !== "production";

  return {
    // The list of plugins for PostCSS
    // https://github.com/postcss/postcss
    plugins: [
      require("postcss-import")(),
      require("postcss-calc")(),
      require("postcss-flexbugs-fixes")(),
      require("postcss-preset-env")({
        stage: 2,
        autoprefixer: {
          flexbox: "no-2009",
        },
        // https://github.com/csstools/postcss-preset-env/blob/master/src/lib/plugins-by-id.js#L36
        features: {
          "nesting-rules": true,
          "color-functional-notation": true
        },
        browsers: pkg.browserslist[env]
      }),
      ...(ISDEV ? [] : [
        require("cssnano")({
          preset: ["default", {
            discardComments: { removeAll: true }
          }]
        })
      ])
    ],
  }
};
