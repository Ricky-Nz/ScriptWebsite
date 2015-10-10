var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	//Entry points to the project
	entry: [
		'./index'
	],
	output: {
		path: path.join(__dirname, 'dist'),    //Path of output file
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
	    //Minify the bundle
	    new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        //supresses warnings, usually from module minification
	        warnings: false
	      }
	    }),
	    //Allows error warnings but does not stop compiling. Will remove when eslint is added
	    new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname
			}
		]
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
