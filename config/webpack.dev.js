const devConfig = {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    stats: "errors-only",
    open: true, // Open the page in browser
    overlay: true
  }
};

export default devConfig;