const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
var package = require('./package.json');

//console.log(Object.keys(webpack.optimize));

const config = {
	entry: {
		vendor: Object.keys(package.dependencies),
		common: "./src/scripts/common.js",
		setting: "./src/scripts/setting.js",
		app: "./src/scripts/app.js"
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js'
	},
	watch:true,
	watchOptions: {
		ignored: /node_modules/
	},
	devServer:{
		inline:true
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: "css-loader", options: {
							sourceMap: true
						}
					}, {
						loader: "sass-loader", options: {
							sourceMap: true
						}
					}],
					// 在开发环境使用 style-loader
					fallback: "style-loader"
				})
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8000, // Convert images < 8kb to base64 strings
						name: 'images/[hash]-[name].[ext]'
					}
				}]
			},
			{
				test: /\.jade$/,
				use: [{
					loader: 'pug-loader',
				}]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: (getPath) => {
				var css_url = getPath('css/[name].css');
				var f_name = css_url.replace('css/js', 'css');
				return f_name;
			},
			allChunks: true
		}),
		new CopyWebpackPlugin([
			// Copy glob results to /absolute/path/
			{ from: './src/images', to: path.resolve(__dirname, './dist/images') }
		]
		),
		new HtmlWebpackPlugin({
			hash: true,
			title: '首页',
			myPageHeader: 'hello!',
			template: './src/temp/index.jade',
			chunks: ['vendor', 'app'],
			filename: './index.html', //relative to root of the application
			minify: false
		}),
		new HtmlWebpackPlugin({
			hash: true,
			title: '登录页',
			myPageHeader: '登录',
			template: './src/temp/setting.jade',
			chunks: ['vendor', 'setting'],
			filename: './login.html',
			minify: false
		})
	]
};

module.exports = config;