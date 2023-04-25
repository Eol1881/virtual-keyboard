const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    open: true,
    // hot: true, // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IF USING SEVERAL CHUNKS
    // port: 1488228
  },
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
  },
  // path.resolve(__dirname, 'src', 'index.js') <======> ./src/index.js
  output: {
    // filename: 'main.[contenthash].js',
    // filename: devMode ? '[name].[contenthash].js': '[name].js', // self-writen rule !!!
    filename: devMode ? 'bundle.[contenthash].js' : 'bundle.js', // self-writen rule !!!
    path: path.resolve(__dirname, 'dist'),
    clean: true,

    assetModuleFilename: 'assets/[name][ext]', //  OR assets/[hash][ext]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'], // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 23, 24 // self-writen rule !!!
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      // filename: 'style.[contenthash].css'
      filename: devMode ? 'style.[contenthash].css' : 'style.css', // self-writen rule !!!
    }),
  ],
  // optimization: {
  //     runtimeChunk: 'single'
  // },
  // >>> Fixes module hot reloading (IF USING SEVERAL CHUNKS) <<<
  module: {
    rules: [
      { // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HTML Rules
        test: /\.html$/,
        loader: 'html-loader',
      },
      { // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CSS Rules
        test: /\.(с|sa|sc)ss$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv,
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      { // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fonts
        // test: /\.woff2?$/i,
        test: /\.(woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      { // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Images
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: 'asset/resource',
      },
      { // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Babel
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
            ],
          },
        },
      },
    ],
  },
};
