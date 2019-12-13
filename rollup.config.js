import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import postcss from 'postcss';
import fs from 'fs';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

const functions = require('./scripts/functions');

const basicSassOptions = {
  processor: css =>
    postcss([
      autoprefixer({
        grid: false,
      }),
      cssnano(),
    ])
      .process(css)
      .then(result => result.css),
};

// Component Sass Options
const componentSassOptions = () => ({
  ...basicSassOptions,
  output: () => null,
});

// Bundle Sass options
const bundleSassOptions = {
  ...basicSassOptions,
  output(styles) {
    fs.writeFileSync('./build/bundle.css', styles);
  },
};

// Named Globals
const globalsConfig = {
  react: 'React',
  'prop-types': 'PropTypes',
  axios: 'axios',
  'react-dates': 'reactDates',
  'react-selectize': 'reactSelectize',
  'google-map-react': 'GoogleMap',
  'google-map-react/utils': 'utils',
  'lodash/sortBy': 'sortBy',
  'react-pdf-js': 'PDF',
  'react-dropzone': 'Dropzone',
  moment: 'moment',
};

// External dependencies
const externalsConfig = [
  'b-lib',
  'react',
  'react-dom',
  'prop-types',
  'styled-components',
  'axios',
  'google-map-react',
  'google-map-react/utils',
  'react-pdf-js',
  'lodash/sortBy',
  'react-dates',
  'react-selectize',
  'moment',
  'react-dropzone',
];

// Babel config used for Bundle generation
const customBabelConfig = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'Chrome >= 52',
            'FireFox >= 44',
            'Safari >= 7',
            'Explorer 11',
            'last 4 Edge versions',
          ],
        },
        modules: false,
        useBuiltIns: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    'syntax-async-functions',
    '@babel/plugin-transform-regenerator',
    'flow-react-proptypes',
    '@babel/transform-flow-strip-types',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    ['babel-plugin-webpack-alias-7', { config: './webpack.config.base.js' }],
    'css-modules-transform',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
  ],
  exclude: /node_modules/,
};

const basicConfig = {
  input: './src/functions.js',
  output: {
    file: './build/functions.js',
    name: 'functions',
    format: 'umd',
    globals: globalsConfig,
  },
  plugins: [babel(customBabelConfig)],
  external: externalsConfig,
};

const { resolveIndexForComponent, ReadEachComponent } = functions;

function generateComponentConfigs() {
  const allComponentConfigs = [];
  ReadEachComponent(folderName => {
    const indexFilePath = resolveIndexForComponent(folderName);
    allComponentConfigs.push({
      ...basicConfig,
      input: indexFilePath,
      output: {
        ...basicConfig.output,
        file: `./${folderName}.js`,
        name: folderName,
      },
      plugins: [...basicConfig.plugins, sass(componentSassOptions(folderName))],
    });
  });
  return allComponentConfigs;
}

// Bundling Configurations
export default [
  // Component Configs
  ...generateComponentConfigs(),

  // Functions bundle
  {
    input: './src/functions.js',
    output: {
      file: './build/functions.js',
      name: 'functions',
      format: 'umd',
      globals: globalsConfig,
    },
    plugins: [babel(customBabelConfig)],
    external: externalsConfig,
  },

  // Main bundle
  {
    input: './src/index.js',
    output: {
      file: './build/bundle.js',
      name: 'blib',
      format: 'umd',
      globals: globalsConfig,
    },
    plugins: [babel(customBabelConfig), sass(bundleSassOptions)],
    external: externalsConfig,
  },
];
