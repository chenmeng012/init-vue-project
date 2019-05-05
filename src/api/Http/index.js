import request from "./request";
import {mockDelete, mockGet, mockPost, mockPut} from "../../libs/mockApi";


function appendPrefix(url) {
  return encodeURI(url);
}

export function get(url, data, config) {

  url = appendPrefix(url);
  if (data && config) {
    config.params = {
      ...config.params,
      ...data
    }
  } else if (data) {
    config = {
      params: data
    }
  }
  return mockGet(url, config, request.get);
  // return request.get(url, config);
}


export function post(url, data, config) {
  url = appendPrefix(url);
  return mockPost(url, data, config, request.post);
  // return request.post(url, data, config);
}


export function put(url, data, config) {
  url = appendPrefix(url);
  return mockPut(url, data, config, request.put);
  // return request.put(url, data, config);

}


export function deleteAjax(url, data, config) {
  url = appendPrefix(url);
  if (data && config) {
    config.params = {
      ...config.params,
      ...data
    }
  } else if (data) {
    config = {
      params: data
    }
  }
  return mockDelete(url, config, request.delete);
  // return request.delete(url, config);
}

/**
 * 为了实现Post下载文件或者打印需求
 * @param url   请求地址
 * @param data  Post form body
 */
export function formPost(url, data) {
  url = process.env.BASE_API + appendPrefix(url);
  formSubmit(url, data, "post");
}

/**
 * 为了实现Get下载文件或者打印需求
 * @param url     请求地址
 * @param params  请求参数
 */
export function formGet(url, params) {
  url = process.env.BASE_API + appendPrefix(url);
  formSubmit(url, params, "get");
}

function formSubmit(url, data, method) {
  // url = appendPrefix(url);
  data = data || {};
  //在这里对data进行增加参数
  // 例如 data.token = 11111


  let postForm = document.createElement("form");//表单对象
  postForm.method = method;
  postForm.action = url;
  postForm.target = "_blank";

  let keys = Object.keys(data);

  for (let k of keys) {
    let input = document.createElement("input");
    input.setAttribute("name", k);
    input.setAttribute("value", data[k]);
    postForm.appendChild(input);
  }
  document.body.appendChild(postForm);
  postForm.submit();
  document.body.removeChild(postForm);
}
