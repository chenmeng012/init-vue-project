/**
 * 所有路由的根组件可以使用该Mixin
 *
 * 默认情况下，
 * -> 页面被打开时:
 *    调用 initView 执行页面初始化。
 * -> 页面被关闭时:
 *    调用隐藏的 @@clearState ,清理页面Vuex状态
 * -> 页面被复用时（我们应该不会触发这个）:
 *    执行调用者自身的 onUpdate 方法
 *
 * @param moduleId
 */
import {mapMutations} from "vuex";
import {MUTATION_CLEAR_STATE} from "../../config/app";
import {registerCloseCheck} from "../LifecycleManager";

export default function (moduleId) {
  return {
    created() {
      if (this.onClose) {
        let path = moduleId;
        if (path.charAt(0) !== "/") {
          path = "/" + path;
        }
        registerCloseCheck(path, this.onClose);
      }

    },
  }
}


