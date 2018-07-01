var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//将css单独打包的插件,v4.0.0 beta版在webpack3.5.4中不能使用
// var UglifyJsPlugin=require('uglifyjs-webpack-plugin');//optimize.UglifyJsPlugin在v4中被废弃

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash:8].css',
  allChunks: true,
  // disable: process.env.NODE_ENV === 'development'
})

var config = {
  // mode: 'development',// v4必须配置
  devtool: 'eval-source-map',//为了方便调试，在开发环境下配置在开发者工具中显示原始源代码（https://webpack.docschina.org/configuration/devtool/）
  entry: {//对象语法比较繁琐，但这是应用程序中定义入口的最可扩展的方式
    index: [
      './src/index.js',
      'webpack-hot-middleware/client?reload=true',
    ],
    vendor: [//将react和react-dom这些单独打包出来，减小打包文件体积
      'react',
      'react-dom'
    ]
  },
  output: {//打包目标路径
    path: path.resolve(__dirname,'dist'),
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js']//当require的模块找不到时，添加后缀
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//不转译node_modules文件夹下的js文件
        // cacheDirectory: true, //将转译的结果缓存到文件系统中，官网说babel-loader至少提速两倍
        use: {
          loader: 'babel-loader',
          // options: {//放到.babelrc中了
          //   presets: ['env','react'] //要先安装babel-preset-env、babel-preset-react，env中包括es2015、es2016、es2017等
          // }
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
              options: {
                modules: true,//开启css modules功能（CSS局部作用域）
                camelCase: true,
                importLoaders: 2,
                localIdentName: `[name]__[local]__[hash:base64:8]`//name：scss文件名，local：类名，后加8位hash值
              }
            },
            'postcss-loader',
            'sass-loader', // 将 Sass 编译成 CSS
          ]
        })
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点 
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', 
      filename: 'js/vendor.bundle.js'
    }), //这是之前单独打包出来的react、react-dom等文件
    // new ExtractTextPlugin("css/[name].[contenthash:8].css"),
    new webpack.DefinePlugin({//定义全局变量
      "process.env": {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ // 压缩打包后的代码
      compress: {
          warnings: false
      }
    }),
    extractSass,
    new webpack.HotModuleReplacementPlugin(),
  ],
  // optimization: {
  //   // splitChunks: {//CommonsChunkPlugin在v4中已经被SplitChunksPlugin替代
  //   //   cacheGroups: {
  //   //     vendor: {//"vendor","js/vendor.bundle.js"
  //   //       name: 'vendor',
  //   //       chunks: 'initial',
  //   //       minChunks: 2
  //   //     }
  //   //   }
  //   // },
  //   minimizer: [//压缩js
  //       new UglifyJsPlugin({
  //           uglifyOptions: {
  //               compress: false
  //           }
  //       })
  //   ]
// },
}

module.exports = config;