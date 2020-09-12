const CopyPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
console.log('is production build', isProduction);

const config = {
  mode: isProduction ? 'production' : 'development',
  devtool: 'eval-source-map',
  entry: './src/index.ts',
  optimization: {
    minimize: isProduction
  },
  target: 'web',
  watch: !isProduction,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          "sass-to-string",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: isProduction ? "compressed" : "expanded",
              },
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css'],
  },
  output: {
    filename: 'widget.js'
  },
  plugins: [
     new CopyPlugin({
      patterns: [
        {from: './index.html', to: './index.html'},
        {from: './favicon.ico', to: './favicon.ico'},
      ],
    })
  ]
}

module.exports = config
