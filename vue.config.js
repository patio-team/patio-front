module.exports = {
  devServer: {
    // To remove hot reload warning message in the dev server build output.
    // @see https://github.com/vuejs/vue-cli/issues/3173
    disableHostCheck: true,
    port: 9000
  },
  pwa: {
    iconPaths: {
      favicon32: './favicon.png',
      favicon16: './favicon.png',
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    },
    lintStyleOnBuild: true,
    stylelint: {},
  },
   // This packages only expose untranspiled version
  transpileDependencies: [
    'resize-detector',
    'vue-echarts',
  ],
  runtimeCompiler: true,
  chainWebpack: config => {
    config.module
      .rule("Snap")
        .test(require.resolve("snapsvg/dist/snap.svg.js"))
        .use("imports-loader")
        .loader("imports-loader?this=>window,fix=>module.exports=0");

    config.resolve.alias.set("snapsvg", "snapsvg/dist/snap.svg.js");
  }
}
