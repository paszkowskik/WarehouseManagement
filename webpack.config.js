const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "/src/app.ts"),
  output: {
    filename: "bundle.min.js",
    path: __dirname,
  },
  module: {
    rules: [{
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Warehouse",
      filename: "../index.html",
    }),
  ],
  node: {
    fs: "empty",
    global: true,
  },
};