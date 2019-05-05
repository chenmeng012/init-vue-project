import ArrayUtils from "./utils/ArrayUtils";
import {MUTATION_CLEAR_STATE} from "../config/app";
import _ from "./utils/ObjectUtils";

let manager = {
  store: null,
  paths: [],
  checkOut: {},
  excludePaths: []
};
const LIFECYCLE = {
  onCreate: "onCreate",
  onPause: "onPause",
  onResume: "onResume",
  onDestroy: "onDestroy"
};

const BaseBehavior = function () {
  return {
    onCreate({dispatch}) {
      dispatch("initView");
    },
    onPause() {
    },
    onResume() {
    },
    onDestroy({commit}) {
      commit(MUTATION_CLEAR_STATE);
    }
  }
};

const LoadNewDataOnShowBehavior = function (parentFn) {
  return function () {
    return extendObject({
      onPause({dispatch}) {
        dispatch("initView");
      },
      onResume({commit}) {
        commit(MUTATION_CLEAR_STATE);
      }
    }, parentFn);
  }
}(BaseBehavior);

export const BEHAVIOR = {
  base: 0,
  loadNewDataOnShow: 1
};

function BehaviorFactory() {

  function create(behavior) {
    if (behavior === BEHAVIOR.loadNewDataOnShow) {
      return new LoadNewDataOnShowBehavior();
    } else {
      return new BaseBehavior();
    }
  }

  function extendBehavior(behavior, customBehavior) {
    let mergedBehavior = create(behavior);
    return Object.assign({}, mergedBehavior, customBehavior);
  }

  return {
    extendBehavior
  }
}

/**
 * 进入页面前被调用
 */
function onEnterPage(to, from) {
  let path = to.path;
  if (getIndex(path) > -1) {//该页面已经进入过
    dispatch(path, LIFECYCLE.onResume, {to, from});
  } else {
    manager.paths.push(path);
    dispatch(path, LIFECYCLE.onCreate, {to, from});
  }
}

/**
 * 离开页面被调用
 */
function onLeavePage(to, from) {
  let path = from.path;
  if (getIndex(path) > -1) {
    dispatch(path, LIFECYCLE.onPause, {to, from});
  }
}


const behaviorFactory = new BehaviorFactory();

const listenRouteEvent = function (router) {
  router.beforeEach((to, from, next) => {
    //路由进入前，调用onEnter，可以用于初始化数据
    if (shouldInterceptRoute(to)) {
      onEnterPage(to, from);
    }
    next();
  });
  router.afterEach((to, from) => {
    //路由离开后，调用onLeave，可以用于清理数据
    if (shouldInterceptRoute(from)) {
      onLeavePage(to, from);
    }
  })
};

const getIndex = function (path) {
  return manager.paths.indexOf(path);
};

const release = function (path) {
  let index = getIndex(path);
  manager.paths.splice(index, 1);
  manager.checkOut[index] = null;
};

/**
 * 调用Action
 * @param path
 * @param action
 * @param payload  {to,from}
 */
const dispatch = function (path, action, payload) {
  let moduleId = mapPathToModuleId(path);
  let module = manager.store._modulesNamespaceMap[moduleId];
  if (!module) {
    console.error("cannot find module " + moduleId);
    return
  }
  let actions = module._rawModule.actions;
  if (actions[action]) {
    module.context.dispatch(action, payload);
  }
};

const mapPathToModuleId = function (path) {
  let moduleId = path;
  if (moduleId.charAt(0) === '/') {
    moduleId = moduleId.substr(1, moduleId.length);
  }
  if (moduleId.charAt(moduleId.length - 1) !== '/') {
    moduleId += '/';
  }
  return moduleId;
};

const shouldInterceptRoute = function (route) {
  return route && route.name && shouldInterceptPath(route.path);
};

const shouldInterceptPath = function (path) {
  return path && !ArrayUtils.oneOf(path, manager.excludePaths)
};

const extendObject = function (child, parent) {
  return Object.assign({}, parent, child);
};

export function syncWith(store, router, options) {
  manager.store = store;
  listenRouteEvent(router);
  if (options && options.excludePaths) {
    manager.excludePaths = options.excludePaths;
  }
}

/**
 * 关闭页面被调用
 */
export function onClosePage(path, forceClose = false) {
  if (!shouldInterceptPath(path)) {
    return true;
  }
  if (forceClose) {
    dispatch(path, LIFECYCLE.onDestroy, null);
    release(path);
    return;
  }
  let index = getIndex(path), canLeave = true;
  if (index > -1) {
    let checkOut = manager.checkOut[index];
    if (checkOut) {
      canLeave = checkOut();
    }
    if (canLeave) {
      dispatch(path, LIFECYCLE.onDestroy, null);
      release(path);
    }
  }
  return canLeave;
}

/**
 * 组件跟页面进入后，注册离开检查
 * @param path
 * @param checkOut
 */
export function registerCloseCheck(path, checkOut) {
  if (!shouldInterceptPath(path)) {
    return;
  }
  let index = getIndex(path);
  if (!manager.checkOut[index]) {
    manager.checkOut[index] = checkOut;
  }
}

export function mergeLifecycleActions(module) {
  if (!module) return module;
  let actions = module.actions || {};

  let customerBehavior = {};
  if (actions.onCreate) {
    customerBehavior.onCreate = actions.onCreate;
  }
  if (actions.onPause) {
    customerBehavior.onPause = actions.onPause;
  }
  if (actions.onResume) {
    customerBehavior.onResume = actions.onResume;
  }
  if (actions.onDestroy) {
    customerBehavior.onDestroy = actions.onDestroy;
  }
  let mergedBehavior = behaviorFactory.extendBehavior(module.behavior, customerBehavior);


  actions.onCreate = mergedBehavior.onCreate;
  actions.onPause = mergedBehavior.onPause;
  actions.onResume = mergedBehavior.onResume;
  actions.onDestroy = mergedBehavior.onDestroy;
  return module;
}
