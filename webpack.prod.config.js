const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const SplitChunksPlugin = require("SplitChunksPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

// const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

var HappyPack = require("happypack");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
	mode: "production",
	devtool: "none",
	entry: {
		main: "./src/index.tsx"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		publicPath: "/"
	},
	resolve: {
		modules: [path.resolve("./src"), path.resolve("./node_modules")],
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }]
			},
			// {
			//   test: /\.tsx?$/,
			//   loader: "ts-loader",
			//   options: {
			//     transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
			//   }
			// }
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "happypack/loader?id=ts"
			}
			// {
			//   test: /\.tsx?$/,
			//   use: [
			//     { loader: "cache-loader" },
			//     {
			//       loader: "thread-loader",
			//       options: {
			//         // there should be 1 cpu for the fork-ts-checker-webpack-plugin
			//         workers: require("os").cpus().length - 1
			//       }
			//     },
			//     {
			//       loader: "ts-loader",
			//       options: {
			//         happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
			//       }
			//     }
			//   ]
			// }
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
		// new ForkTsCheckerWebpackPlugin(),
		// new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
		// new ForkTsCheckerNotifierWebpackPlugin({
		//   title: "TypeScript",
		//   excludeWarnings: false
		// }),
		new CleanWebpackPlugin(["dist"]),
		new Dotenv(),
		new HtmlWebpackPlugin({
			hash: true,
			title: "My Awesome application",
			myPageHeader: "Hello World",
			template: "./src/index.html",
			filename: path.resolve(__dirname, "dist") + "/index.html" //relative to root of the application
		})
	]
};
