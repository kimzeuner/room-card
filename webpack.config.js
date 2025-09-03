const webpack = require('webpack');
const path = require('path');
const compressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        filename: 'room-card.js',
        path: path.resolve(__dirname),
    },
    optimization: {
        minimize: true
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: { transpileOnly: true }
            }
          ],
        },
        // (Optional) Nur wenn du ECHTE .js-Dateien im src hast und sie minifizieren willst:
        // {
        //   test: /\.m?js$/,
        //   exclude: /node_modules/,
        //   use: [{ loader: 'minify-html-literals-loader' }],
        // },
      ],
    },

    
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new compressionPlugin({
            test: /\.js(\?.*)?$/i,
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
};
