const path = require("path");
const webpack = require("webpack");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	entry: { 
		app: './src/js/cards.js', 
		vendor: ['react', 'react-dom'] 
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[chunkhash].js',
		chunkFilename: "[name].[chunkhash].js",
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
	            use: ExtractTextPlugin.extract({
	            	fallback: 'style-loader',
	                use: [
	                	'css-loader',
	                	'sass-loader'
	                ]

	            })
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
		extensions: ['.js', '.jsx', '.scss', '.css']
	},

	plugins: [
		new ExtractTextPlugin('style.css'),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
			},
			comments: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ["vendor", "manifest"]
	    }),
		new webpack.HashedModuleIdsPlugin(),
		new WebpackChunkHash(),
	    new ChunkManifestPlugin({
			filename: "chunk-manifest.json",
			manifestVariable: "webpackManifest"
		}),
		new HtmlWebpackPlugin()
	]
}