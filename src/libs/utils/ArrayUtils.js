const oneOf = (ele, arr) => {
  return arr.indexOf(ele) >= 0;
};

function isNotEmpty(arr) {
  return arr && Array.isArray(arr) && arr.length > 0;
}

/**
 * 查找某一个元素在数组中的位置
 * @param ele       要查找的元素
 * @param arr       目标数组
 * @param callback  查找规则
 */
function getIndexOf(ele, arr, callback) {
  if (!ele || !arr || !callback) return -1;
  for (let i = 0, len = arr.length; i < len; i++) {
    if(callback(ele,arr[i])){
      return i;
    }
  }
  return -1;
}
/**
 * 获取数组当中每一项的ID 返回成字符串
 * @param arr       目标数组
 * @param callback  查找规则
 */
function getIdStr(arr){
  let idArr = []
  arr.forEach((item)=>{
    idArr.push(item.id);
  })
  return idArr.join();
}

/**
 * 在数组查找某一个元素(元素是对象)
 * @param type       要查找的元素
 * @param arr       目标数组
 * @param condition  查找参数
 */
function getItemBy(arr, type, condition) {
  if (!arr || !type) return;
  let newArr = arr.filter((item) => {
    if (item[type] === condition){
      return true
    }
  });
  if (newArr.length > 0){
    return newArr[0]
  }
  return '';
}

/**
 * 在数组查找某一个元素(元素是对象)
 * @param type       要查找的元素
 * @param arr       目标数组
 * @param condition  查找参数
 */
function getItemIndex(arr, type, condition) {
  if (!arr || !type) return;
  let newArr = arr.filter((item,index) => {
    if (item[type] === condition){
      return true;
    }
  });
  if (newArr.length > 0){
    return arr.indexOf(newArr[0])
  }
  return -1;
}

function uniq(array){
  var temp = {}, r = [], len = array.length, val, type;
  for (var i = 0; i < len; i++) {
    val = array[i];
    type = typeof val;
    if (!temp[val]) {
      temp[val] = [type];
      r.push(val);
    } else if (temp[val].indexOf(type) < 0) {
      temp[val].push(type);
      r.push(val);
    }
  }
  return r;
}



export default {
  oneOf,
  isNotEmpty,
  getIndexOf,
  getIdStr,
  getItemBy,
  getItemIndex,
  uniq
}
