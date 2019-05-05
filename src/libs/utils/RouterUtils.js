import UserPersistence from "../../persistence/UserPersistence";
import {ROUTER_ADMIN, ROUTER_INDEX, ROUTER_NAME_404, ROUTER_NAME_HOME, ROUTER_NAME_LOGIN} from "../../router/router";

const RouterUtils = {};



RouterUtils.getRouterObjByName = function (menuList, name) {
  if (!name || !menuList || !menuList.length) {
    return null;
  }
  for (let item of menuList) {
    if (item.routeUrl === name) {
      return item;
    }
  }
  return null;
};

export default RouterUtils;
