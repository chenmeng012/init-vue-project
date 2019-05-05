import {deleteAjax, get, post, put, formPost} from "./Http";

//用户登录
function login(user, pwd, loginFlag, loginType) {
  return post('/ctx-portal/v1/operate/loginService', {"usercode": user, "password": pwd, "flag": loginFlag, "loginType": loginType});
}

export default {
  login
}
