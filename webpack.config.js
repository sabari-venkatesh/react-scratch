const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// regex patterns 

const SRC_DIR = resolve(__dirname, "src");
const BUILD_DIR = resolve(__dirname, "build");
const CONFIG_DIR = resolve(__dirname, "config");

const config = (env, argv) => {

  const
    mode = argv.mode || "development",
    ISDEV = mode === "development",
    ISPROD = mode === "production",
    // regex patterns to match the resources
    IMAGES = /\.(bmp|gif|jpg|jpeg|png|svg)$/,
    STYLES = /\.css$/i,
    ASSET_LIMIT = 4096,
    ASSET_NAME = ISDEV
      ? "[path][name].[ext]?[hash:8]"
      : "[hash:8].[ext]";

  return {
    mode,
    devtool: ISDEV ? "cheap-module-source-map" : "source-map",
    context: SRC_DIR,
    entry: "./app.js",
    output: {
      filename: "[name].[contenthash].js",
      path: BUILD_DIR,
      publicPath: "/",
    },
    ...(ISDEV && {
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
          use: [ISDEV ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: ISPROD,
              modules: {
                localIdentName: ISDEV
                  ? "[name]-[local]-[hash:base64:5]"
                  : "[hash:base64:5]",
              }
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: ISPROD,
              config: {
                // pass variables to the config file
                ctx: {
                  env: mode,
                },
                // dir to look for postcss.config.js file
                path: CONFIG_DIR,
              },
            },
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
                    limit: ASSET_LIMIT,
                  },
                },
                {
                  loader: "url-loader",
                  options: {
                    name: ASSET_NAME,
                    limit: ASSET_LIMIT,
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
          include: SRC_DIR,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader",
            options: {
              root: CONFIG_DIR,
              babelrc: false,
              envName: mode,
              cacheDirectory: ISDEV,
              cacheCompression: false,
              compact: ISPROD,
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
        title: "Hello world",
        template: "index.html",
        inject: true,
        ...(ISPROD && {
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
      ISPROD && new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        chunkFilename: "[name].[contenthash:8].chunk.css"
      }),
    ].filter(Boolean),
    resolve: {
      modules: ["node_modules", "src"]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
          },
        },
      },
    },
    performance: {
      maxAssetSize: 250000
    }
  }
}

module.exports = config;