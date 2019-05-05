import ArrayUtils from "./utils/ArrayUtils";
import {ENABLE_MOCK} from "../../config/myConfig";
import {ENABLE_API_LOG} from "../../config/myConfig";

let mocker = window.__CTX_MOCK__ = {
  _urls: [],//用于console查看
  mock: {},
};
const CONSOLE_COLOR = 'background: #4368aa;color: #FFFFFF';
const CONSOLE_COLOR_ERROR = 'background: #e83838;color: #FFFFFF';

/*打印mock日志*/
function logMock(url, response) {
  if (ENABLE_API_LOG) {
    let hasError = !response.result;
    if (hasError) {
      console.log("%c Mock ", CONSOLE_COLOR_ERROR, "<- URL: " + url + "\n       <- error:", response.error);
    } else {
      console.log("%c Mock ", CONSOLE_COLOR, "<- URL: " + url + "\n       <- data:", response);
    }
  }
}

function genMockFunction(key, value) {
  if (value instanceof Function) {
    return function () {
      let result = value.apply(mocker, arguments);
      logMock(key, result);
      return Promise.resolve(result);
    }
  }

  return function () {
    logMock(key, value);
    return Promise.resolve(value);
  }

}

function pushToMocker(mocker, api) {
  for (let key of Object.keys(api)) {
    let value = api[key];
    console.info(`Mock:${key}`);
    mocker._urls.push(key);
    mocker.mock[key] = genMockFunction(key, value);
  }
}


export function mockApi(apiArr) {
  for (let api of apiArr) {
    pushToMocker(mocker, api);
  }
}

export function shouldMockRequest(url) {
  return ENABLE_MOCK && ArrayUtils.oneOf(url, mocker._urls);
}

export function mockGet(url, config, realRequest) {
  if (shouldMockRequest(url)) {
    let api = mocker.mock[url];
    //TODO: pass url params to api()
    return api();
  }
  return realRequest.call(this, url, config);
}

export function mockPost(url, data, config, realRequest) {
  if (shouldMockRequest(url)) {
    let api = mocker.mock[url];
    return api(data);
  }
  return realRequest.call(this, url, data, config);
}

export function mockPut(url, data, config, realRequest) {
  if (shouldMockRequest(url)) {
    let api = mocker.mock[url];
    return api(data);
  }
  return realRequest.call(this, url, data, config);
}

export function mockDelete(url, config, realRequest) {
  if (shouldMockRequest(url)) {
    let api = mocker.mock[url];
    //TODO: pass url params to api()
    return api();
  }
  return realRequest.call(this, url, config);
}
