const path = require('path');
const PugPlugin = require('pug-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './pug/pages/index.pug',
    'about-us': './pug/pages/about-us.pug'
    //☝🏽 Insert your PUG HTML files here
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: './',
    filename: 'assets/js/[name].[contenthash:8].js'
    //☝🏽 Output filename of files with hash for unique id
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },
  resolve: {
    alias: {
      "../jquery": require.resolve("jquery")
    }
  },
  plugins: [
    new PugPlugin({
      pretty: true,
      self: true,
      //☝🏽 Format HTML (only in dev mode)
      css: {
        filename: './assets/css/[name].[contenthash:8].css'
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
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
        use: ['css-loader', 'sass-loader'],
        //☝🏽 Load Sass files
      },
      {
        // To use images on pug files:
        test: /\.(png|jpg|jpeg|ico)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[ext]'
        }
      },
      {
        // To use fonts on pug files:
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]'
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery']
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    watchFiles: {
      paths: ['/pug/**/*.*', 'assets/scss/**/*.*', 'scss/**/*.*'],
      //☝🏽 Enables HMR in these folders
      options: {
        client: {
          overlay: {
            errors: true,
            warnings: false,
            runtimeErrors: true,
          },
        },
        usePolling: true
      }
    }
  },
  stats: 'errors-only'
  //☝🏽 For a cleaner dev-server run
};