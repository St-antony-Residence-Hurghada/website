const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
  entry: {
    index: './pug/pages/index.pug',
    about: './pug/pages/about-us.pug'
    //☝🏽 Insert your PUG HTML files here
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'assets/js/[name].[contenthash:8].js'
    //☝🏽 Output filename of files with hash for unique id
  },
  plugins: [
    new PugPlugin({
      pretty: true,
      self: true,
      //☝🏽 Format HTML (only in dev mode)
      css: {
        filename: '/css/[name].css'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader
        //☝🏽 Load Pug files
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader', 'style-loader'],
        //☝🏽 Load Sass files
      },
      {
        // To use images on pug files:
        test: /\.(png|jpg|jpeg|ico)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        // To use fonts on pug files:
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]'
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    watchFiles: {
      paths: ['pug/**/*.*', 'assets/scss/**/*.*', 'scss/**/*.*'],
      //☝🏽 Enables HMR in these folders
      options: {
        usePolling: true
      }
    }
  },
  stats: 'errors-only'
  //☝🏽 For a cleaner dev-server run
};