let path = require('path')

module.exports = {
  devtool: 'eval-source-map',//为了方便调试，在开发环境下配置在开发者工具中显示原始源代码（https://webpack.docschina.org/configuration/devtool/）
  entry: './src/index',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//不转译node_modules文件夹下的js文件
        // cacheDirectory: true, //将转译的结果缓存到文件系统中，官网说babel-loader至少提速两倍
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react'] //要先安装babel-preset-env、babel-preset-react，env中包括es2015、es2016、es2017等
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点 
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点 
          'css-loader',
        ]
      }
    ]
  }
}