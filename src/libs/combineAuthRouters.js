/**
 * 按照路由配置规则，初始化一些默认参数，
 * @param routers
 */
export default function initAuthRouters(routers) {
  for (let router of routers) {
      if(router.children){
        let parentPath = router.path;
        for (let child of router.children){
          if (parentPath === '/'){
            child.fullPath = `${parentPath}${child.path}`;
          }else{
            child.fullPath = `${parentPath}/${child.path}`;
          }
        }
      }
  }
  return routers;
}
