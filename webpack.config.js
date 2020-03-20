const { join, resolve } = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// regex patterns 



const config = (env, argv) => {
  const mode = argv.mode || "development";
  const __ISDEV__ = mode !== "production";

  const IMAGES = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
  const STYLES = /\.css$/i;
  const ASSET_LIMIT = 4096;
  const ASSET_NAME = __ISDEV__
    ? "[path][name].[ext]?[hash:8]"
    : "[hash:8].[ext]";
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
        clientLogLevel: "none",
        hot: true,
        overlay: false,
        open: true,
      }
    }),
    module: {
      rules: [
        // rules for styles
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [__ISDEV__ ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: !__ISDEV__,
              modules: {
                localIdentName: __ISDEV__
                  ? "[name]-[local]-[hash:base64:5]"
                  : "[hash:base64:5]",
              }
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("postcss-import")(),
                require("postcss-calc")(),
                require("postcss-flexbugs-fixes")(),
                require("postcss-preset-env")({
                  stage: 1,
                  autoprefixer: {
                    flexbox: "no-2009",
                  },
                  // https://github.com/csstools/postcss-preset-env/blob/master/src/lib/plugins-by-id.js#L36
                  features: {
                    "nesting-rules": true,
                    "color-functional-notation": true
                  },
                  browsers: pkg.browserslist[mode]
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
        },

        // rules for images
        {
          test: IMAGES,
          oneOf: [
            {
              issuer: STYLES,
              oneOf: [
                {
                  test: /\.svg$/,
                  loader: "svg-url-loader",
                  options: {
                    name: ASSET_NAME,
                    limit: ASSET_LIMIT, // 4kb
                  },
                },
                {
                  loader: "url-loader",
                  options: {
                    name: ASSET_NAME,
                    limit: ASSET_LIMIT, // 4kb
                  },
                }
              ]
            },

            {
              loader: "file-loader",
              options: {
                name: ASSET_NAME,
              },
            }
          ]
        },

        // rules for scripts
        {
          test: /\.(js|jsx)$/,
          include: resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader",
            options: {
              root: resolve(__dirname, "config"),
              babelrc: false,
              envName: mode,
              cacheDirectory: __ISDEV__,
              cacheCompression: false,
              compact: !__ISDEV__,
              ignore: ["node_modules", "build"],
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