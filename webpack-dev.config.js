var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	//Entry points to the project
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),    //Path of output file
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: path.join(__dirname, 'src')
			}, {
				test: /\.css$/,
				loader: 'style!css?sourceMap'
			}, {
			  test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			  loader: "url?limit=10000&mimetype=application/font-woff"
			}, {
			  test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			  loader: "url?limit=10000&mimetype=application/font-woff"
			}, {
			  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			  loader: "url?limit=10000&mimetype=application/octet-stream"
			}, {
			  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			  loader: "file"
			}, {
			  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			  loader: "url?limit=10000&mimetype=image/svg+xml"
			}
		]
	},
	//Server Configuration options
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		hot: true,        //Live-reload
		historyApiFallback: true,
		host : '0.0.0.0',
		port: 8080,        //Port Number
		stats: {
			colors: true
		}
	}
};
