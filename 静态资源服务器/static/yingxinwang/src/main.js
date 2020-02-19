window.onload = function () {
        let qrcode = new Qrocode('qrcode', 'animate');
        let goTop = new GoTop('go-top');
        let fire = new Fire();
        let time = new Time('2020-02-24 00:00:00');
        let map = new Map();
        let goTopBtn = goTop.goTopBtn;
        window.onmousewheel = update; //绑定函数
        //绑定函数
        window.addEventListener('keydown', function (event) {
            let k = event.key;
            if (k === 'ArrowDown') update();
            if (k === 'ArrowUp') update();
            if (k === ' ') update();
        })
        update() //打开网页时更新状态

        //更新状态
        function update() {
            if (goTopBtn.style.display === 'none') {
                if (document.documentElement.scrollTop >= 320) {
                    goTop.showUp();
                    qrcode.qrcodeAddAnimation();
                }
            }
            else if (goTopBtn.style.display === 'block') {
                if (document.documentElement.scrollTop < 320) {
                    goTop.coverUp();
                    qrcode.qrcodeRemoveAnimation();
                }
                if (document.documentElement.scrollTop >= 4540) {
                    goTopBtn.classList.add('adjust');
                }
                else {
                    goTopBtn.classList.remove('adjust');
                }
            }
        }
}