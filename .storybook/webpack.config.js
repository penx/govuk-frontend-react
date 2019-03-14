// https://github.com/facebook/create-react-app/blob/6c8e2e53c5cca6226a5dc1509f6ca26f509fcbd7/packages/react-scripts/config/webpack.config.js
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;


module.exports = {
  module: {
    rules: [
      {
        test: sassModuleRegex,
        loaders: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          require.resolve('sass-loader')
        ],
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        loaders: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: false,
            },
          },
          require.resolve('sass-loader')
        ],
      },
    ],
  },
}
