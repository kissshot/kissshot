var webpack = require('webpack')

module.exports = {
  entry: {
      blog: './public/js/blog/main.js',
      admin: './public/js/admin/main.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins:[
        new webpack.optimize.UglifyJsPlugin({
             compress: {
                warnings: false
             }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            chunks: ["blog", "admin"],
            minChunks: 2
        })
        ,
        new webpack.ProvidePlugin({
            $: __dirname + '/public/vendor/jquery/jquery-2.0.2.min.js'
        })
    ]
}
