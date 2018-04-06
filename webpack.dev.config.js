const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

var HappyPack = require("happypack");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/"
	},
	resolve: {
		modules: [path.resolve("./src"), path.resolve("./node_modules")],
		extensions: [".ts", ".tsx", ".js"]
	},
	devServer: {
		contentBase: "./dist",
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }]
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "happypack/loader?id=ts"
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					filename: "vendor.js",
					enforce: true
				}
			}
		}
	},
	plugins: [
		new HappyPack({
			id: "ts",
			threads: 2,
			loaders: [
				{
					path: "ts-loader",
					query: { happyPackMode: true }
				}
			]
		}),
		new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
		// new CleanWebpackPlugin(["dist"]),
		// new CopyWebpackPlugin([
		//   {
		//     from: path.resolve(__dirname, "src/resources"),
		//     to: path.resolve(__dirname, "dist/resources")
		//   }
		// ]),
		// // new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
		// new ForkTsCheckerNotifierWebpackPlugin({
		//   title: "TypeScript",
		//   excludeWarnings: false
		// }),
		new Dotenv(),
		// new ExtractTextPlugin("main.[chunkhash].css"),
		new HtmlWebpackPlugin({
			hash: true,
			title: "My Awesome application",
			myPageHeader: "Hello World",
			template: "./src/index.html",
			filename: path.resolve(__dirname, "dist") + "/index.html" //relative to root of the application
		})
	]
};
