module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: false,
        corejs: false,
        debug: false,
      },
    ],
    ['@babel/preset-typescript'],
  ],
  env: {
    development: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-transform-async-to-generator'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  ignore: [/node_modules/],
};
