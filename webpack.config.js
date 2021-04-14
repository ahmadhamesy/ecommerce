var HtmlWebpackPlugin = require("html-webpack-plugin");
var OptimizeCssExtractPlugin= require('optimize-css-assets-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { dirname } = require("path");
var path = require("path");
module.exports = {
    entry: {
      app: "./src/index.js",
    },
    output:{
        path: path.join(__dirname, "/dist"),
        publicPath:'',
        filename:"main.js"
    },
    mode:"development",
    devServer :{
        contentBase:path.join(__dirname,"/dist"),
        port:1235,
        writeToDisk:true,
        open:true,
    },
    module: {
        rules :[
            {
                test:/\.html$/,
                use:[
                    {
                        loader:"html-loader",
                        options:{
                            minimize:true,
                            
                        },
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                     MiniCssExtractPlugin.loader,
                  "css-loader",
                ],
              },
        
              {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                      outputPath:"images",
                    },
                  },
                ],
              },
            ],
          },
        
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:"./src/index.html",
        }),
    new MiniCssExtractPlugin({filename: "css/style.css"}),
    new OptimizeCssExtractPlugin({})
    ],
};