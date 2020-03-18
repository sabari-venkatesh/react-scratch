import { join, resolve } from "path";
import pkg from "./package.json";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";

const config = (env, argv) => {
  const __ISDEV__ = argv.mode !== "production";

  return {
    mode: argv.mode || "development",
    devtool: __ISDEV__ ? "cheap-module-source-map" : "source-map",
    context: join(__dirname, "src"),
    entry: "./app.js",
    output: {
      filename: "[name].[contenthash].js",
      path: resolve(__dirname, "build"),
      publicPath: "/",
    },
    ...(__ISDEV__ && {
      devServer: {
        historyApiFallback: true,
        compress: true,
        clientLogLevel: 'none',
        hot: true,
        overlay: false,
        open: true,
      }
    }),
    module: {
      rules: [{
        test: /\.css$/i,
        use: [__ISDEV__ ? "style-loader" : MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            sourceMap: !__ISDEV__,
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:3]',
            }
          },
        },
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
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
            ],
            sourceMap: !__ISDEV__
          }
        }],
      }, {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]',
        },
      }, {
        test: /\.(js|jsx)$/,
        use: [{
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            compact: !__ISDEV__
          }
        }]
      }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
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
      !__ISDEV__ && new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        chunkFilename: "[name].[contenthash:8].chunk.css"
      })].filter(Boolean),
    resolve: {
      modules: ["node_modules", "src"]
    }
  }
}

export default config;