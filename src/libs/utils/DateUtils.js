/**
 *时间格式化
 * @param date
 * @param format 例如 yyyy-MM-dd
 * @returns {*}
 */

const format = (date, format) => {
  if (!date || !date instanceof Date) {
    return
  }
  if ((typeof date) === "string"){
    date = new Date(date);
  }
  let o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(),    //day
    "h+": date.getHours(),   //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
    "S": date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o) if (new RegExp("(" + k + ")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return format;
};

/**
 *
 * @param date
 */
function getYear(date) {
  let dateObj = getDateObj(date);
  if (dateObj) {
    return dateObj.getFullYear();
  }
};


function getPeriod(date) {
  let dateObj = getDateObj(date);
  if (dateObj) {
    let period = dateObj.getMonth() + 1;
    if (period < 10){
      period = "0"+ period
    }
    return period;
  }
}

function getDate(date) {
  let dateObj = getDateObj(date);
  if (dateObj) {
    let date = dateObj.getDate()
    if (date < 10){
      date = "0"+ date
    }
    return date;
  }
}

function getYearAndMontStr(date) {
  let year = getYear(date);
  let period = getPeriod(date)
  return `${year}-${period}`
}

function getYearAndMontAndDateStr(date) {
  let year = getYear(date);
  let period = getPeriod(date);
  let dates = getDate(date)
  return `${year}-${period}-${dates}`
}

function createDate(year, period) {
  return new Date(year, period - 1);
}

function getDateObj(date) {
  let dateObj = null;
  if (date instanceof Date) {
    dateObj = date;
  } else {
    if ((typeof date) === "string") {
      date = date.replace(new RegExp(/-/gm), "/");
      let dateArr = date.split('/');
      if (dateArr.length === 2){
        dateObj = new Date(date + '/01');
      }else{
        dateObj = new Date(date);
      }
    }else{
      dateObj = new Date(date);
    }

  }
  return dateObj;
}

//返回一个月的最后一天
function getMonthLastDate(date, format) {
  if (!format)  format = '-';
  date = date? new Date(date) : new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let p = m;
  if (p < 10){
    p = "0"+ p
  }
  if(m === 2){
    return y % 4 === 0 ? y + format + p + format + 29 : y + format + p + format + 28;
  }else if(m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12){
    return y + format + p + format + 31;
  }else{
    return y + format + p + format + 30;
  }
}

/**
 * 获取上一个月
 * @type 格式'month'/'date'为空默认返回date
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getPreMonth(date,type,format) {
  if (!format)  format = '-';
  date = getYearAndMontAndDateStr(date);
  let arr = date.split('-');
  let year = arr[0]; //获取当前日期的年份
  let month = arr[1]; //获取当前日期的月份
  let day = arr[2]; //获取当前日期的日
  // let days = new Date(year, month, 0);
  // days = days.getDate(); //获取当前日期中月的天数
  let year2 = year;
  let month2 = parseInt(month) - 1;
  if (month2 === 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  let day2 = day;
  let days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }


  if (type === 'month'){
    return year2 + format + month2
  }else{
    return year2 + format + month2 + format + day2;
  }
}

/**
 * 获取下一个月
 * @type 格式'month'/'date'为空默认返回date
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getNextMonth(date,type,format) {
  if (!format)  format = '-';
  date = getYearAndMontAndDateStr(date);
  let arr = date.split('-');
  let year = arr[0]; //获取当前日期的年份
  let month = arr[1]; //获取当前日期的月份
  let day = arr[2]; //获取当前日期的日
  // let days = new Date(year, month, 0);
  // days = days.getDate(); //获取当前日期中的月的天数
  let year2 = year;
  let month2 = parseInt(month) + 1;
  if (month2 === 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  let day2 = day;
  let days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }


  if (type === 'month'){
    return year2 + format + month2
  }else{
    return year2 + format + month2 + format + day2;
  }
}

export default {
  format,
  getYear,
  getPeriod,
  getDate,
  createDate,
  getYearAndMontStr,
  getYearAndMontAndDateStr,
  getMonthLastDate,
  getPreMonth,
  getNextMonth,
}
