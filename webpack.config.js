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
        // TypeScript: TS -> JS -> minify HTML literals -> (optional) Babel
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            // läuft NACH ts-loader (rechts->links)
            {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env'] },
            },
            { loader: 'minify-html-literals-loader' },
            {
              loader: 'ts-loader',
              options: { transpileOnly: true },
            },
          ],
        },
    
        // Reine JS-Dateien
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env'] },
            },
            { loader: 'minify-html-literals-loader' },
          ],
        },
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
