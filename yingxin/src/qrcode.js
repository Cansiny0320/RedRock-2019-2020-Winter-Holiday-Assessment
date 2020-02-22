let Qrocode = function (className, animationClassName) {
    this.qrcode = document.getElementsByClassName(className)[0]; //获取二维码块
    this.animationClassName = animationClassName
};

Qrocode.prototype.qrcodeAddAnimation = function () {
    this.qrcode.classList.add(this.animationClassName);
}

Qrocode.prototype.qrcodeRemoveAnimation = function () {
    this.qrcode.classList.remove(this.animationClassName);
}