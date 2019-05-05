/**
 * 工程开发基本配置。
 */
module.exports = {
  //API服务器地址
  API_SERVER: "https://zuul2test.cailian.net",
  //服务器url前缀
  API_PREFIX: "/ctx-",
  //本地webpack开发服务器端口
  DEV_SERVER_PORT: 8090,
  //本地build文件测试服务器端口
  PLAY_SERVER_PORT: 9000,
  ENABLE_API_LOG: false,
  //vue-router 的模式，history or hash
  VUE_ROUTER_MODE: "hash",
  //是否开启mock
  ENABLE_MOCK: false,
  //是否启用webpack bundleAnalyzerPlugin
  ENABLE_BUNDLE_ANALYZER: false,

};
