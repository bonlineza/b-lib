const path = require('path');

module.exports = {
  externals: {
    jest: 'jest',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      'test-util': path.resolve(__dirname, 'src/test-util'),
      test: path.resolve(__dirname, 'src/test'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['sass-loader'],
        include: [path.resolve(__dirname, '../scss/')],
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['airbnb'],
            },
          },
        ],
      },
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['airbnb'],
            },
          },
        ],
      },
    ],
  },
};
