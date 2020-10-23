const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
      filename: 'build.js',
      path: path.join(__dirname, '/build')},
  module: {
      rules:[
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: [
            'babel-loader'
          ]    
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {  
          test: /\.scss$/,  
          use: ['style-loader', 'css-loader', 'sass-loader']  
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins:[
      new HWP(
        {template: path.join(__dirname,'/public/index.html')}
      )
  ],
}