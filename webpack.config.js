const path = require('path')
// HtmlWebpackPlugin 打包时生成HTML并把打包生成的js文件引入html中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// plugin 可以再webpack运行到某个时刻，帮你做一些事

// CleanWebpackPlugin 是打包时之前删掉上一次的打包文件
// CleanWebpackPlugin 错误写法
// const CleanWebpackPlugin  = require('clean-webpack-plugin')
// 在plugins里面配置是  new CleanWebpackPlugin() 括号里面不要加['dist']
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpack = require('webpack')

module.exports ={
    mode:"development",
    // development 开发环境
    // devtool:"cheap-module-eval-source-map",
    // production 生产环境
    // devtool:"cheap-module-source-map",
    devtool:"cheap-module-eval-source-map",
    entry:{
        main:"./src/index.js",
    },
    devServer:{
        // 监听哪个文件夹
        contentBase:'./dist',
        // 自动打开浏览器访问
        open:true,
        port:8082,
        // 热模块更换
        hot:true,
        hotOnly:true
    },
    module:{
        rules:[
            {
                test:/\.(jpg|png|gif)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        // placeholder 占位符
                        name:'[name].[hash].[ext]',
                        // 创建图片文件夹
                        outputPath:'images',
                        // 图片超过2k时会创建图片文件夹否则直接在js文件中打包
                        limit:2048
                    }
                }
            },
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test:/\.(eot|ttf|svg|woff)$/,
                use:{
                    loader:"file-loader",
                }
            }
        ]
    },
    // 打包时生成html的配置
    plugins:[new HtmlWebpackPlugin({
        template:'src/index.html',
    }),new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output:{
        publicPath:"/",
        // 多数用于访问服务器上的静态文件路径
        // 默认为main.js
        filename:"[name].js",
        path:path.resolve(__dirname,'dist')
    },
}