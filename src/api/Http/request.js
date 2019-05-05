import axios from "axios";
import * as devConfig from "../../../config/myConfig";

import {
  BASER_SERVER_ERROR_CODE_WITH_ERROR_MESSAGE, COMMON_SERVER_ERROR_CODES,
  COMMON_SERVER_ERROR_MESSAGE, DURATION_OF_SERVER_ERROR_MESSAGE, WHITE_LIST_CODE
} from "../../config/app";
import ArrayUtils from "../../libs/utils/ArrayUtils";

const CONSOLE_COLOR = 'background: #4368aa;color: #FFFFFF';
const CONSOLE_COLOR_ERROR = 'background: #e83838;color: #FFFFFF';
const ENABLE_DEBUG = devConfig.ENABLE_API_LOG === undefined ?
  process.env.NODE_ENV !== 'production' : devConfig.ENABLE_API_LOG;

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
});

service.interceptors.response.use((response) => {
  printResponse(response);

  let data = response.data;
  //服务器返回错误消息
  if (data.error) {
    handleResponseError(data);
  }
  //服务器返回消息提示
  // if(data.msg && !data.result){
  //   handleResponseInfo(data);
  // }
  // else if (isResponseEmpty(data)) {//服务器返回值为空
  //   handleEmptyResponse();
  // }
  return response.data;
}, function (error) {
  handleNetworkError(error);
});

service.interceptors.request.use(config => {
  //在这可对config进行设置
  // 例如 config.headers.token = 111111;
  return config;
});


function printResponse(response) {

  if (ENABLE_DEBUG) {
    let hasError = response.data.error;
    if (hasError) {
      console.log("%c Http ", CONSOLE_COLOR_ERROR, "<- URL: " + response.config.url + "\n       <- error:", response.data.error);
    } else {
      console.log("%c Http ", CONSOLE_COLOR, "<- URL: " + response.config.url + "\n       <- data:", response.data);
    }
  }
}

function handleResponseError(data) {
  let errorCode = data.error.code,
    errorMessage = null;

  if (errorCode && ArrayUtils.oneOf(errorCode, COMMON_SERVER_ERROR_CODES)) {
    errorMessage = COMMON_SERVER_ERROR_MESSAGE;
  }else if (errorCode > BASER_SERVER_ERROR_CODE_WITH_ERROR_MESSAGE || errorCode>DURATION_OF_SERVER_ERROR_MESSAGE) {
    errorMessage = data.error.message;
  }

  if (errorCode && ArrayUtils.oneOf(errorCode, WHITE_LIST_CODE)) return;
  console.log(errorMessage)

}

function handleResponseInfo(data) {
  let info = data.msg;
  console.log(info)
}


function isResponseEmpty(data) {
  return !data.value && data.value !== '' && data.value !== false && data.value !== 0;
}

function handleEmptyResponse() {
  console.log("没有返回值")
}

function handleNetworkError(error) {
  console.error( "网络异常:" + error);
}

export default service;
