const path = require('path');
const webpack = require('webpack');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',

	entry: { 
		app: './src/js/cards.js',
		vendor: ['react', 'react-dom']
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/',
		sourceMapFilename: '[name].map'
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
			          presets: ['env', 'react']
			        }
				},
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.scss$/,
	            use: [
					"style-loader",
					"css-loader",
					"sass-loader"
		        ]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor" // vendor libs + extracted manifest
	    }),
		new HtmlWebpackPlugin()
	],

	devServer: {
		hot: true, // Tell the dev-server we're using HMR
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	}
}

