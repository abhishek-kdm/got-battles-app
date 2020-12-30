const { resolve } = require('path');

module.exports = ({ NODE_ENV }) => {
  const mode = process.env.NODE_ENV || NODE_ENV;

  return {
    target: 'node',
    mode,
    devtool: 'inline-source-map',
    watch: mode !== 'production',
    entry: resolve(__dirname, 'src', 'index.ts'),
    output: {
      path: resolve(__dirname, 'public'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          resolve: { extensions: ['.ts'] },
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
  }
};

