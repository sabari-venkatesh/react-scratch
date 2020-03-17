const pkg = require("../package.json");

const __ISDEV__ = process.env.NODE_ENV !== "production";

module.exports = opt => {
  return {
    plugins: [
      require("postcss-import")(),
      require('postcss-calc')(),
      require('postcss-flexbugs-fixes')(),
      require("postcss-preset-env")({
        stage: 1,
        autoprefixer: {
          flexbox: 'no-2009',
        },
        // https://github.com/csstools/postcss-preset-env/blob/master/src/lib/plugins-by-id.js#L36
        features: {
          "nesting-rules": true,
          "color-functional-notation": true
        },
        browsers: pkg.browserslist[process.env.NODE_ENV]
      }),

      ...(__ISDEV__ ? [] : [
        require("cssnano")({
          preset: ["default", {
            discardComments: { removeAll: true }
          }]
        })
      ])
    ]
  };
};
