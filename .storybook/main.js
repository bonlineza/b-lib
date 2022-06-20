// .storybook/main.js
const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../stories/*.@(js)'],
  addons: ['@storybook/addon-actions/register'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    );

    // Return the altered config
    return config;
  },
};
