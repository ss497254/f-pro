const path = require("path");
const webpack = require("webpack");
const loadScriptWebpackPlugin = require("./load-script-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  devServer: {
    hot: false,
    client: false,
    port: 9999,
    static: { watch: false },
    allowedHosts: ["cses.fi", "localhost"],
    devMiddleware: {
      writeToDisk: true,
    },
  },
  devtool: process.env.WEBPACK_SERVE ? "inline-source-map" : false,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "src"),
      app: path.resolve(__dirname, "src", "app"),
    },
  },
  entry: {
    "service-worker": path.resolve(__dirname, "src", "service-worker.ts"),
    "content-script": path.resolve(__dirname, "src", "content-script.ts"),
    popup: path.resolve(__dirname, "src", "popup", "index.tsx"),
  },
  output: {
    filename: "src/[name].js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    ...(process.env.WEBPACK_SERVE
      ? [
          new webpack.HotModuleReplacementPlugin(),
          new ReactRefreshWebpackPlugin({
            overlay: false,
          }),
          new loadScriptWebpackPlugin(),
        ]
      : []),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: () => `${path.join(__dirname, "build")}/[name][ext]`,
          force: true,
        },
      ],
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              getCustomTransformers: () => ({
                before: [
                  process.env.WEBPACK_SERVE && ReactRefreshTypeScript(),
                ].filter(Boolean),
              }),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: !process.env.WEBPACK_SERVE,
  },
};
