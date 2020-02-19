var Map = function () {
    let map = document.querySelector('#map'); //获取地图
    let mapBtn = document.querySelectorAll('.map-btn'); //获取地点按钮数组
    let smallBtn = document.querySelector('.small-btn'); //获取缩小地图按钮
    let plusBtn = document.querySelector('.plus-btn'); //获取放大地图按钮
    let flags = []; //地图上的falgs
    let times = 1; //放大倍数 范围[1,4] 每次改变0.6
    //设置缩放倍数
    var setTimes = function (times) {
        map.style.transform = 'scale(' + times + ')';
        map.style.left = 0;
        map.style.top = 0;
    }
    //添加flag
    var addFlag = function () {
        map.innerHTML = '';
        for (let i = 0; i < flags.length; i++) {
            const element = flags[i];
            map.innerHTML += element;
        }
    }
    //设置 map 和 flag 样式
    var setStyle = function (mapStyle, flagStyle) {
        map.style = mapStyle;
        flags.push(flagStyle);
        times = 4;
        addFlag();
    }
    //缩小按钮点击事件
    smallBtn.onclick = function() {
        if(times > 1 && times <= 4) times -= 0.6;
        if(times < 1) times = 1;
        if (times > 4) times =4;
        setTimes(times);
    }
    //放大按钮点击事件
    plusBtn.onclick = function() {
        if(times >= 1 && times < 4) times += 0.6;
        if(times < 1) times = 1;
        if (times > 4) times =4;
        setTimes(times);
        
    }
    //中心食堂 
    mapBtn[0].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: 16px; top: -64px;',
            '<div class="flag" style="top: 206px; left: 319px;"></div>');
    }
    //太极操场
    mapBtn[1].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: 248px; top: 160px;',
            '<div class="flag" style="top: 150px; left: 261px;"></div>');
    }
    //红岩网校
    mapBtn[2].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: 296px; top: 84px;',
            '<div class="flag" style="top: 169px; left: 249px;"></div>');
    }
    //信科大楼
    mapBtn[3].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: -164px; top: -444px;',
            '<div data-v-09b50738="" class="flag" style="top: 301px; left: 364px;"></div>');
    }
    //二教
    mapBtn[4].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: 340px; top: -220px;',
            '<div data-v-09b50738="" class="flag" style="top: 245px; left: 238px;"></div>');
    }
    //新校门
    mapBtn[5].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: 748px; top: -500px;',
            '<div data-v-09b50738="" class="flag" style="top: 315px; left: 136px;"></div>');
    }
    //老校门
    mapBtn[6].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: 172px; top: -584px;',
            '<div data-v-09b50738="" class="flag" style="top: 336px; left: 280px;"></div>');
    }
    //校史馆
    mapBtn[7].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: 928px; top: -204px;',
            '<div data-v-09b50738="" class="flag" style="top: 241px; left: 91px;"></div>');
    }
    //教务处
    mapBtn[8].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: 992px; top: 60px;',
            '<div data-v-09b50738="" class="flag" style="top: 175px; left: 75px;"></div>');
    }
    //老图书馆
    mapBtn[9].onclick = function () {
        setStyle('transform: scale(4); transition: all 0.6s ease 0s; left: 92px; top: -276px;',
            '<div data-v-09b50738="" class="flag" style="top: 259px; left: 300px;"></div>');
    }

};