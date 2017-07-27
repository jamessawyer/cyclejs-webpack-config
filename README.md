## cyclejs webpack 配置

使用 **`jsx`** 语法

参考资料：
  1. **[webpack 3 基本骨架的搭建](https://github.com/toddmotto/angular-lazy-load-demo/blob/master/webpack.config.js)** 虽然这个是angular 的webpack 配置，但是大部分配置是通用的
  2. **[cyclejs webpack + babel config](https://gist.github.com/miguelmota/8de70f5860e84e1fbc934451750efcc3)** 这个基本上是正确的，但是其中 包"babel-root-import" 已经改名为 **[babel-plugin-root-import](https://github.com/entwicklerstube/babel-plugin-root-import)**,这一点需要注意
  3. 因为使用了 **`jsx`** 语法，打包时会报 **React is not defined** 错误，可以参考**[ stack-oveflow - “React is undefined” error in CycleJs app](https://stackoverflow.com/questions/37844980/react-is-undefined-error-in-cyclejs-app)**,但是不同的是，我在**`.babelrc`**中使用的是 **`["transform-react-jsx", { "parama": "html" }]`**, 所以我在使用到jsx语法的最上面加上了 **`/** @jsx html */`**,并且必须使用 **`import { html } from 'snabbdom-jsx'`**


步骤：

> 1.安装依赖

```
// 开发依赖
npm i -D babel-core 
         babel-loader 
         babel-plugin-root-import 
         babel-plugin-transform-function-bind // 这个非必须
         babel-preset-es2015
         babel-preset-stage-2
         webpack
         webpack-dev-server
         cross-env
         rimraf       

// 依赖
npm i -S babel-plugin-transform-react-jsx   // 转换jsx语法
         snabbdom-jsx
         // 下面的都是cyclejs相关的一些库
         xstream  
         @cycle/dom
         @cycle/run
```  


> 2.配置.babelrc

```
{
    "presets": [
        "stage-2",
        "es2015"
    ],
    "plugins": [
        "syntax-jsx",
        ["transform-react-jsx", { "parama": "html" }],
        "transform-function-bind",
        ["babel-plugin-root-import", {
            "rootPathSuffix": "src/"
        }]
    ]
}
```

> 3.配置webpack.config.js

这个直接看项目下的文件即可

> 4.使用

在使用jsx语法的js文件中

```
/** jsx html */
import { html } from 'stabbdom-jsx'
```

> 5.npm scripts

```
// package.json

"scripts": {
    "build": "cross-env NODE_ENV=production webpack -p",
    "build:dev": "cross-env NODE_ENV=development webpack-dev-server --inline --hot",
    "build:production": "npm run clean && npm run build",
    "clean": "rimraf build",
    "start": "npm run build:dev"
  },
```

更多scripts参考 **[angular-lazy-load-demo/package.json](https://github.com/toddmotto/angular-lazy-load-demo/blob/master/package.json)**

然后运行：

```
npm start

// 打开提示的地址，比如
localhost:8080
```

> 6.将打包的文件丢在index.html中

在index.html中添加下面2个开发时生成的文件即可

```
<body>
    <div id="app-container"></div>
    <script src="build/vendor.js"></script>
    <script src="build/main.js"></script>
</body>
```

