const custom = require("../webpack.config");

module.exports = {
  stories: ["../src/components/**/stories.js"],
  addons: ["@storybook/addon-actions/register"],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: custom(null, config.mode).module.rules,
      },
    };
  },
};
