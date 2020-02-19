var GoTop = function (className) {
    this.goTopBtn = document.getElementsByClassName(className)[0]; //绑定返回顶部按钮
    this.goTopBtn.onclick = this.goTop.bind(this); //绑定事件
    this.time = null; //定时器
};

//火箭出现事件
GoTop.prototype.showUp = function () {
    let finalTop = 27.77778;
    let startTop = 57.77778;
    let valTop = startTop;
    let speed = 2;
    let _this = this;
    this.goTopBtn.style.top = startTop + 'vw';
    this.goTopBtn.style.display = 'block';
    this.time = setInterval(function () {
        if (valTop > finalTop) {
            valTop -= speed;
            _this.goTopBtn.style.top = valTop + 'vw';
        }
        else
            clearInterval(_this.time);
    }, 1000 / 60);
    _this.goTopBtn.classList.add('animateR');

    setTimeout(function () { //让css动画执行完
        _this.goTopBtn.classList.remove('animateR');
        _this.goTopBtn.style.top = '';
    }, 1000);
}

//火箭消失事件
GoTop.prototype.coverUp = function () {
    let startTop = 27.77778;
    let finalTop = -17.77778;
    let valTop = startTop;
    let speed = 5;
    let _this = this;
    this.goTopBtn.classList.add('animateR');
    this.time = setInterval(function () {
        if (valTop > finalTop) {
            valTop -= speed;
            _this.goTopBtn.style.top = valTop + 'vw';
        }
        else
            clearInterval(_this.time);
    }, 1000 / 60);
    setTimeout(function () { _this.goTopBtn.style.display = 'none' }, 100);
}

GoTop.prototype.goTop = function () {
    let _this = this;
    let speed = document.documentElement.scrollTop / 10; //距离越远越快
    this.time = setInterval(function () {
        document.documentElement.scrollTop -= speed;
        if (document.documentElement.scrollTop === 0) {
            clearInterval(_this.time);
            setTimeout(_this.coverUp.bind(_this), 100);
        }
    }, 1000 / 60);
}