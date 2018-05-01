# webpack

搭建起项目中基本的loaders，观察者模式，模块热更新，代理等

## 1. 官方配置

搭建需要注意*开发环境(development)*和*生产环境(production)*的构建目标差异很大。

参考地址：[地址](https://doc.webpack-china.org/concepts/)

## 2. vue-cli

vue-cli让搭建更加容易，参考地址：[地址](https://cn.vuejs.org/v2/guide/installation.html)

```shell
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm run dev
```

vue-cli代理设置在config目录，参考地址：[地址](https://segmentfault.com/a/1190000011007043)

```javascript
// 设置index.js中dev
proxyTable: {
  "/api": {
    target: "http://localhost:3000",
    pathRewrite: { "^/api": "" }
  }
}
```

production需要将地址重新设置config目录

```javascript
// 设置index.js中的build
build: {
  // Template for index.html
  index: path.resolve(__dirname, '../dist/index.html'),

  // Paths
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: './'
}
```

webpack.base.conf.js

```javascript
// @ 代表的是src路径，方便对资源的引用
resolve: {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    '@': resolve('src'),
  }
}
```

