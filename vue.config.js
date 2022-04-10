module.exports = {
  publicPath: "./", // ./ 从相对路径访问  /myapp /myapp 访问资源
  productionSourceMap: false, // 关闭源码的映射
  devServer: {
    proxy: "https://nicemusic-api.lxhcool.cn",
  }
};
