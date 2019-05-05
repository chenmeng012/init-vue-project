/**
 * 路由配置的权限与用户当前权限是否匹配
 * （用户是否有权限访问当前菜单）
 * @param routerAccess
 * @param userAccess
 */
import ArrayUtils from "./ArrayUtils";

function isAccessMatched(routerAccess, userAccess) {
  if (routerAccess === undefined) return true;
  if(Array.isArray(userAccess) && userAccess.length > 0){
    for (var i=0,l=userAccess.length; i< l;i++){
      if(ArrayUtils.oneOf(userAccess[i], routerAccess)) {
        return true;
      }
    }
  }



  // return !!(routerAccess === undefined
  //   || (Array.isArray(routerAccess) && ArrayUtils.oneOf(userAccess, routerAccess))
  //   || parseInt(userAccess) === routerAccess);
}

export default {
  isAccessMatched
}
