var Fire = function () {
    this.fireShowUp = document.querySelectorAll('.fireShowUp');
    this.fire = document.querySelectorAll('.fire');
    this.reset();
};

//绑定火焰动画
Fire.prototype.reset = function() {
    let _this = this;
    for (let i = 0; i < this.fireShowUp.length; i++) {
        this.fireShowUp[i].onmouseover = function () {
            for (let i = 0; i < _this.fire.length; i++) {
                _this.fire[i].style.opacity = 1;
            }
        }
        this.fireShowUp[i].onmouseleave = function () {
            for (let i = 0; i < _this.fire.length; i++) {
                _this.fire[i].style.opacity = 0;
            }
        }
    }   
}


