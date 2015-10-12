var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/index",

  output: {
    path: __dirname + "/dist/",
    filename: "bundle.js"
  },

  module: {
    loaders: [
		{
			test: /\.js$/,
			loaders: ['babel'],
			exclude: /node_modules/,
			include: __dirname + "/src"
		}
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
