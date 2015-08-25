// webpack.config.js
module.exports = {
  entry: "./src/js/app.js",
  output: {
    filename: "./dist/js/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ["", ".js", ".json"]
  }
};
