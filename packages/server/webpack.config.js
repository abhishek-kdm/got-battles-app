const NodeExternals = require('webpack-node-externals');
const { resolve } = require('path');

module.exports = (env) => {
  const NODE_ENV = process.env.NODE_ENV || env.NODE_ENV;

  return {
    mode: NODE_ENV,
    entry: resolve(__dirname, 'index.js'),
    target: 'node',
    node: {
      __filename: true,
      __dirname: true,
    },
    externals: [NodeExternals({ modulesFromFile: true })],
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'index.js',
    },
  }
};

