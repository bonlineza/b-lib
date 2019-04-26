const path = require('path');

module.exports = {
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'raw-loader', 'sass-loader'],
        include: [path.resolve(__dirname, '../css/')],
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
