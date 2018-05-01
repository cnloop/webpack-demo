const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: ["babel-polyfill", "./src/main.js"],
  devtool: "inline-source-map", // 显示报错源信息
  plugins: [
    new HtmlWebpackPlugin({
      title: "new index",
      template: "./index.html" // 将index输出到dist中 并将build.js自动引入到index中
    }),
    //配置热更新
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  //配置www目录 开发启动不会在磁盘上生产dist，但是内存会有
  devServer: {
    contentBase: "./",
    hot: true, //配置热更新
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" }
      }
    }
  },
  // 解析第三方包，引入方式第三方包也会打包到build，build会越来越大，那么就放入index，配置解析
  resolve: {
    alias: {
      vue: "vue/dist/vue.js",
      vueRouter: "vue-router/dist/vue-router.js", // 虽然默认走vue-router.js，但是不推荐删除
      axios: "axios/dist/axios.js",
      lodash: "lodash/lodash.js"
    }
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // 3. creates style nodes from JS strings
          },
          {
            loader: "css-loader" // 2. translates CSS into CommonJS
          },
          {
            loader: "less-loader" // 1. compiles Less to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            // caCheDirectory: true, //打开缓存，提交效率
            presets: ["env"], // 格式全部包括
            plugins: ["transform-runtime"] //减少代码重复问题
          }
        }
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      }
    ]
  }
};
