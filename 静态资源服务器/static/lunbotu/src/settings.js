var Settings = function () {
    this.timeInput = document.querySelector('.change-time-input'); //获取时间输入框
    this.timeBtn = document.querySelector('.change-time-content .input-btn');//获取时间改变确定按钮
    this.imgSrcInput = document.querySelector('#imgSrc'); //获取图片src输入框
    this.imgIndexInput = document.querySelector('#imgIndex'); //获取图片位置输入框
    this.img = document.querySelectorAll('.imgList img'); //获取所有图片
    this.imgBtn = document.querySelector('.change-img-content .input-btn'); //获取图片改变确定按钮
    this.animationBtn = document.querySelectorAll('.change-animation-content ul li');//获取动画改变确定按钮
    this.timeBtn.onclick = this.changeAutoTime.bind(this); //绑定事件
    this.imgBtn.onclick = this.changeImg.bind(this); //绑定事件
    this.animationBtn[0].onclick = this.changeAnimation.bind(this); //绑定事件
    this.animationBtn[0].mode = '左右滑动';
    this.animationBtn[1].onclick = this.changeAnimation.bind(this); //绑定事件
    this.animationBtn[1].mode = '淡入淡出';
};

//改变轮播时间
Settings.prototype.changeAutoTime = function() {
    let autoTime = this.timeInput.value;
    window.localStorage.setItem('autoTime', JSON.stringify(autoTime)); //将数据存储到本地
    location.reload(); //刷新页面
}

//改变图片
Settings.prototype.changeImg = function() {
    let imgSrc = this.imgSrcInput.value;
    let imgIndex = this.imgIndexInput.value;
    if ((imgSrc && imgIndex) && (imgIndex >= 1 && imgIndex <= this.img.length)) {
        this.img[imgIndex - 1].src = imgSrc;
    }
}

//改变轮播动画
Settings.prototype.changeAnimation = function(e) {
    let modeTarget = e.target;
    window.localStorage.setItem('animation-mode', JSON.stringify(modeTarget.mode));
    location.reload();
}

