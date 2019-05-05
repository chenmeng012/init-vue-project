const digitUppercase = function (money) {
  let isNegative = money < 0;
  if (isNegative) {
    money = -money;
  }
  //汉字的数字
  let cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  let cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  let cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  let cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  let cnInteger = '整';
  //整型完以后的单位
  let cnIntLast = '元';
  //最大处理的数字
  let maxNum = 999999999999999.9999;
  //金额整数部分
  let integerNum;
  //金额小数部分
  let decimalNum;
  //输出的中文金额字符串
  let chineseStr = '';
  //分离金额后用的数组，预定义
  let parts;
  if (money == '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    let IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    let decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  if (isNegative) {
    return "负" + chineseStr;
  }
  return chineseStr;
};
const formatData = function (s,n){
  if (s === null || s ==='' || s === undefined) return null;
  // num = num.toFixed(2);
  // num = parseFloat(num);
  // num = num.toLocaleString();
  // return num;
  let flag = false;
  n = n > 0 && n <= 20 ? n : 2;
  if(isNaN(s)) return s;
  s = s+"";
  if (s[0] === '-') {
    s = s.substring(1);
    flag = true;
  }
  s = parseFloat(s.replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1], t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
  }
  return flag ? '-' + t.split("").reverse().join("") + "." + r : t.split("").reverse().join("") + "." + r;
};

const formatStr = function(str){
  if (str === null){
    return null
  }
  str = str +'';
  return str.replace(/,/g,'')
};
//保留两位小数方法
const formatNumber = function(data){
  let value = Math.round(parseFloat(data) * 100) / 100;
  let d = value.toString().split(".");
  if (d.length === 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (d.length > 1) {
    if (d[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
};

export default {
  digitUppercase,
  formatData,
  formatStr,
  formatNumber,
}
