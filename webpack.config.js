const CleanWebpackPlugin = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = env => ({
  entry: { "freelance-crm": "./src/App/index.tsx" },
  output: {
    path: __dirname + "/dist/static",
    fileName: process.env.LOCAL === "true" ? "[name].js" : "[name].[hash].js",
    publicPath: process.env.PUBLIC_PATH || "/dist/static/"
  },
  module: {
    rules: [
      {
        test: /\.()$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.()$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  devtool: "sourcemap",
  devServer: {
    historyApiFallback: true,
    index: "index.html",
    port: 3015,
    host: "0.0.0.0"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new ManifestPlugin()
  ],
  optimization: {
    namedChunks: true
  }
});
