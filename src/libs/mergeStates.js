/**
 * 将从各个模块导出的状态组成部分组合
 */
import cloneDeep from "lodash.clonedeep";

import {MUTATION_CLEAR_STATE, MUTATION_INIT_STATE} from "../config/app";
import {mergeLifecycleActions} from "./LifecycleManager";

export function mergeStateModules(...modules) {
  let mappedModules = [];
  modules.forEach(m => {
    if (m.default instanceof Array) {
      mappedModules.push(...m.default)
    } else {
      mappedModules.push(m);
    }
  });
  return {
    namespaced: true,
    modules: {
      ...mergeStates(mappedModules)
    }
  }
}

function mergeStates(states) {
  let mergedModules = {};
  states.forEach(item => {
    if (!item.moduleId) {
      console.error("没有声明moduleId", item);
      return;
    }
    mergedModules[item.moduleId] = mergeState(item);
  });
  return mergedModules;
}

function mergeState(stateObj) {

  stateObj = stateObj.default ? stateObj.default : stateObj;
  stateObj = mergeLifecycleActions(stateObj);
  let state = {
    namespaced: true,
    state: stateObj.state,
    actions:
    stateObj.actions,
    mutations: genMutations(stateObj),
    getters:
    stateObj.getters
  };

  return state;
}

/**
 * 生成mutations
 * @param stateObj
 */
function genMutations(stateObj) {
  if (!stateObj.mutations) return null;
  stateObj.mutations[MUTATION_CLEAR_STATE] = function (oriState) {
    return (state) => {
      Object.assign(state, cloneDeep(oriState));
    };
  }(cloneDeep(stateObj.state));

  return stateObj.mutations;
}


