module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Power BI Pro Users',
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/powerbi-pro-users/' : '/',
  devServer: {
    host: '127.0.0.1',
    hot: true,
    disableHostCheck: true,
  },
};
