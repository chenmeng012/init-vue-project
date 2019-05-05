import Vue from 'vue'
import VueRouter from 'vue-router'
import {VUE_ROUTER_MODE} from "../../config/myConfig";
import {routers} from "./router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  mode: VUE_ROUTER_MODE,
  routes: routers
};

export const router = new VueRouter(RouterConfig);


router.beforeEach((to, from, next) => {

  if(process.env.NODE_ENV !== 'development') {//用于校验客户端是否为最新代码
    var versionScript = document.createElement("script");
    versionScript.src =  location.origin+ '/chen.js?v=' + new Date().getTime();
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(versionScript, s);

    window.getVersion = version => {
      if(localStorage.frontendVersion && version !== localStorage.frontendVersion) {
        console.log('系统已更新！请刷新后重试');
        localStorage.frontendVersion = version; // 保存 以便下次使用判断
        return
      }

      localStorage.frontendVersion = version; // 保存 以便下次使用判断
    };
  }
  NProgress.start();
  next();
});

router.afterEach((to) => {
  NProgress.done();
  // Util.openNewPage(router.app, to.name, to.params, to.query);
  window.scrollTo(0, 0);
});
