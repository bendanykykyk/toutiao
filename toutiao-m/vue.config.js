module.exports = {
  publicPath: "./",
  outputDir: "docs",
  configureWebpack: {
    resolve: {
      alias: {
        //取别名，方便寻资源
        assets: "@/assets",
        style: "@/style",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        utils: "@/utils",
        store: "@/store",
        router: "@/router"
      }
    }
  }
};
