const webpack = require("webpack");

module.exports = function override(config) {
  // Adicionando polyfills para módulos Node.js
  config.resolve.fallback = {
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    querystring: require.resolve("querystring-es3"),
    fs: false,
    net: false,
    vm: false,
    async_hooks: false,
    zlib: require.resolve("browserify-zlib"), // Polyfill para zlib
  };

  // Ignorar avisos de dependências críticas
  config.ignoreWarnings = [
    {
      message: /critical dependency/,
    },
  ];

  // Adicionando plugins para fornecer polyfills
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  return config;
};
