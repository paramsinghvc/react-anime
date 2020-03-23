const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: "./src/index.tsx",
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    animejs: "animejs",
    "react-transition-group": "react-transition-group"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: 'reactAnimeJs',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};

if (process.env.ANALYSE === 'true') {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
