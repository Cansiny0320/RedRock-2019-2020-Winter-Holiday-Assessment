var Time = function (endtime) {
    //'yyyy-MM-dd HH:mm:ss' 格式
    this.timeList = document.querySelectorAll('.time_ul li');
    this.endtime = endtime;
    this.update();
};


//格式化时间
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,//月份
        "d+": this.getDate(),//日
        "H+": this.getHours(),//小时
        "m+": this.getMinutes(),//分
        "s+": this.getSeconds(),//秒
        "q+": Math.floor((this.getMonth() + 3) / 3),//季度
        "S+": this.getMilliseconds()//毫毛
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

Time.prototype.update = function () {
    var timeObj = new Object();
    var endtimeDate = new Date(this.endtime);
    var nowtimeDate = new Date().Format("yyyy-MM-dd HH:mm:ss");
    nowtimeDate = new Date(nowtimeDate)
    var endtimeStamp;
    var nowtimeStamp;
    if (endtimeDate == "Invalid Date") {
        endtimeStamp = this.endtime;
    } else {
        endtimeStamp = endtimeDate.getTime();
    }
    if (nowtimeDate == "Invalid Date") {
        nowtimestamp = nowtime;
    } else {
        nowtimestamp = nowtimeDate.getTime();
    }
    if (endtimeStamp > nowtimestamp) {
        var date3 = endtimeStamp - nowtimestamp; //时间差的毫秒数
        //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000))
        //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        timeObj.days = days;
        timeObj.hours = hours;
        timeObj.minutes = minutes;
        timeObj.seconds = seconds;
    } else {
        timeObj.days = 0;
        timeObj.hours = 0;
        timeObj.minutes = 0;
        timeObj.seconds = 0;
    }
    this.timeList[0].innerHTML = timeObj.days;
    this.timeList[1].innerHTML = timeObj.hours;
    this.timeList[2].innerHTML = timeObj.minutes;
    this.timeList[3].innerHTML = timeObj.seconds;
    setTimeout(this.update.bind(this), 1000);
};