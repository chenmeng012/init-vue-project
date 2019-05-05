//浏览器标签页默认的标题
//TODO:修改默认标题
export const DEFAULT_WINDOW_TITLE = "财天下-首页";
//服务器返回这些错误时，直接弹窗提示 "服务器异常，请稍后再试！"
export const COMMON_SERVER_ERROR_MESSAGE = "服务器异常，请稍后再试！";
export const COMMON_SERVER_ERROR_CODES = ["400", "403", "404", "500", "501", "502", "503"];
//40000 以上的服务器异常代码，直接使用服务器返回的errorMessage提示给用户
export const BASER_SERVER_ERROR_CODE_WITH_ERROR_MESSAGE = 40000;

export const WHITE_LIST_CODE = ['22222', '33333'];

export const DURATION_OF_SERVER_ERROR_MESSAGE = 5000;
//默认提示框持续时间
export const DURATION_DEFAULT = 1500;


export const MUTATION_INIT_STATE = "@@initState";
export const MUTATION_CLEAR_STATE = "@@clearState";


export const REGULAR_CODE = {
  PHONE_REG: new RegExp('^[1][3,4,5,6,7,8,9][0-9]{9}$'),//手机号
  EMAIL_REG: new RegExp('^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]){1,63}\\.[a-z0-9]+$'),//邮箱
  ID_NUMBER_REG: new RegExp('(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)'),//身份证号
  USER_CODE_REG: new RegExp('^[a-zA-Z0-9]{6,10}$'),//用户编码
  COMPANY_CODE_REG: new RegExp('^[0-9a-zA-Z_]{6,20}$'),//公司编码
};
