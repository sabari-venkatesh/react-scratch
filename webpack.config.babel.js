import path from "path";

import merge from "webpack-merge";
import dev from "./config/webpack.dev";
import prod from "./config/webpack.prod";

import { getStyleLoaders, getPlugins } from "./config/webpack.parts";

const __ISDEV__ = process.env.NODE_ENV !== "production";

const common = merge([{
  mode: __ISDEV__ ? 'development' : 'production',
  context: path.join(__dirname, "src"),
  entry: "./app.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: !__ISDEV__
      })
    }]
  },
  plugins: getPlugins()
}]);

const config = () => {
  if (__ISDEV__) {
    return merge(common, dev);
  }

  return merge(common, prod);
}

export default config;