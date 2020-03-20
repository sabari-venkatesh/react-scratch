const { join, resolve } = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = (env, argv) => {
  const mode = argv.mode || "development";
  const __ISDEV__ = mode !== "production";

  return {
    mode,
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
        exclude: /node_modules/,
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
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              // A Babel preset that can automatically determine the Babel plugins and polyfills
              // https://github.com/babel/babel-preset-env
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: pkg.browserslist[mode],
                  },
                  useBuiltIns: "entry",
                  forceAllTransforms: !__ISDEV__, // for UglifyJS
                  modules: false,
                  useBuiltIns: false,
                  debug: true,
                },
              ],
            ],
            // cacheDirectory: false,
            // compact: !__ISDEV__
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
      }),
    ].filter(Boolean),
    resolve: {
      modules: ["node_modules", "src"]
    }
  }
}

module.exports = config;