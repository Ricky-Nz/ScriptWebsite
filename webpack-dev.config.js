var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	//Entry points to the project
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./index'
	],
	output: {
		path: path.join(__dirname, 'dist'),    //Path of output file
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			exclude: /node_modules/,
			include: __dirname
		}]
	},
	//Server Configuration options
	devServer: {
		publicPath: '/static/',
		hot: true,        //Live-reload
		historyApiFallback: true,
		host : '0.0.0.0',
		port: 8080,        //Port Number
		stats: {
			colors: true
		}
	}
};
