import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CleanPlugin from "../plugins/clean";
const __ISDEV__ = process.env.NODE_ENV !== "production";

const getStyleLoaders = (options) => {
  const loaders = [
    __ISDEV__ ? "style-loader" : MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options,
    },
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        config: {
          path: path.resolve(__dirname, "postcss.config.js")
        },
        sourceMap: !__ISDEV__
      }
    }
  ].filter(Boolean);

  return loaders;
}

const getPlugins = () => {
  return [
    // new CleanPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      ...(!__ISDEV__ && {
        hash: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      })
    }),
    new webpack.DefinePlugin({
      __ISDEV__: JSON.stringify(__ISDEV__)
    }),
    !__ISDEV__ && new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].chunk.css"
    }),
  ].filter(Boolean)
}

export { getStyleLoaders, getPlugins };