const webpack = require('webpack');
const path = require("path");

module.exports = {
	stats: {children: false},
	entry: {
		app: [
			'react-hot-loader/patch',
			'./index.js'
		],
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'js/app.js'
	},
	devtool: 'inline-source-map',

	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		port: 8081,
		hot: true,
		host: '0.0.0.0',
	},
	module: {
		rules: [
			{
				test: /\.js?/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					query: {
						presets: ['react', 'stage-0', ['es2015', {"modules": false}]],
						plugins: [
							"transform-class-properties",
							"react-hot-loader/babel"
						]
					}
				}
				]
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'less-loader'}]

			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', ".less"]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};
