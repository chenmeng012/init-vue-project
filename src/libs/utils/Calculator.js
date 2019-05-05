//计算器（数学表达式计算）

//复杂的计算方法（包含括号，目前只是小括号）
const complexEval = function(str) {
  if (str == null) {
    return "";
  }
  if (typeof str != "string") {//转化成字符串
    str = str + ""
  }
  str = str.replace(/\)\(/g,")*(");
  var multObj = getPriority(str);//匹配括号
  //不断计算最底层括号的数据
  while (null != multObj)
  {
    var content = multObj +"";
    var result = simpleEval(content.substr(1, content.length - 2));
    str = str.replace(multObj,result);
    multObj = getPriority(str);
  }

  return simpleEval(str);
};

//简单的计算方法，只有加减乘除
const simpleEval = function(str) {
  if (str == null) {
    return "";
  }
  if (typeof str != "string") {//转化成字符串
    str = str + ""
  }

  var valueArray = new Array();//值的数组
  var markArray = new Array();//符号的数组
  var tempValue = "";
  var ch = str.split("");
  var isOper = false;
  for(var i=0; i< ch.length; i++){
    if( ch[i] == "+" || ch[i] == "-" || ch[i] == "*" || ch[i] == "/") {//符号
      var dv = tempValue*1;
      if(isOper){
        var value = valueArray.pop();
        var mark = markArray.pop();
        dv = simpleTwoEval(mark, value, dv);
      }
      valueArray.push(dv);
      markArray.push(ch[i]);
      tempValue = "";
      isOper = false;
      if( ch[i] == "*" || ch[i] == "/" )
        isOper = true;
    }else{
      tempValue += ch[i] + "";
      if(i == ch.length -1){//最后一位
        var dv = tempValue*1;
        if(isOper){
          var dv1 = valueArray.pop();
          var mark = markArray.pop();
          var result = simpleTwoEval(mark, dv1, tempValue);
          dv = result;
        }
        valueArray.push(dv);
      }
    }
  }

  valueArray = reverseArray(valueArray);
  markArray =  reverseArray(markArray);
  while(valueArray.length > 1){
    var v1 = valueArray.pop();
    var v2 = valueArray.pop();
    var mark = markArray.pop();
    valueArray.push(simpleTwoEval(mark, v1, v2));
  }
  return valueArray[0];

};

//两个数的加减乘除
const simpleTwoEval = function(mark,value1,value2){
  if(mark == "+"){
    return value1 + value2;
  }else if(mark == "-"){
    return value1 - value2;
  }else if(mark == "*"){
    return value1 * value2;
  }else if(mark == "/"){
    return value1 / value2;
  }
  return 0;
};

//反转数组
const reverseArray = function(oldArray){
  var newArray = new Array();
  var size = oldArray.length;
  for(var i=0; i< size; i++){
    newArray.push(oldArray.pop());
  }
  return newArray;

};

//找到最深的括号
const getPriority = function(str) {
  let nextInd = str.indexOf(')');
  if (nextInd === -1) return null;

  var preInd ,pos = str.indexOf('(');
  while(pos > -1){
    preInd = pos;
    pos = str.indexOf('(',pos+1);
    if (pos > nextInd) return str.slice(preInd, nextInd + 1);
  }
  return str.slice(preInd, nextInd + 1);
};



export default {
  complexEval,
  simpleEval,
}
