//ES6 class
class MySlider {
	constructor(slideId) {
		this.mode = JSON.parse(window.localStorage.getItem('animation-mode')) || '左右滑动'; //切换动画  默认 左右滑动 可切换 淡入淡出
		this.autoTime = JSON.parse(window.localStorage.getItem('autoTime')) || 3000; //自动切换时间
		this.slide = document.getElementById(slideId); //获取第一层
		this.room = this.slide.getElementsByTagName('div')[0]; //获取第二层
		this.img = this.room.getElementsByTagName('img'); //获取图片数组
		this.slideWidth = parseInt(getComputedStyle(this.slide).width); //获取slide的宽度
		this.slideHeight = parseInt(getComputedStyle(this.slide).height); //获取slide的高度，用来动态居中按钮的位置
		this.up = null; //获取按钮
		this.down = null; //获取按钮
		this.navButton = null; //获取到所有的原点li
		this.time = null; //定时器
		this.imgIndex = 1; //获取图片位置
		this.speed = -(this.slideWidth / 10); //动画速度
		this.speed2 = 0.1 //动画速度
		this.resetAllButton();  //初始化设置
		this.slide.onmouseenter = this.onmouseenter.bind(this); //绑定鼠标进入事件
		this.slide.onmouseleave = this.onmouseleave.bind(this); //绑定鼠标离开事件
		//根据动画绑定按钮事件
		if (this.mode === '左右滑动') {
			this.down.onclick = this.nextStart.bind(this); //按钮绑定事件
			this.up.onclick = this.prevStart.bind(this); //按钮绑定事件
			this.autoStart = setInterval(this.nextStart.bind(this), this.autoTime); //定时器
		} else if (this.mode === '淡入淡出') {
			this.down.onclick = this.nextStart2.bind(this); //按钮绑定事件
			this.up.onclick = this.prevStart2.bind(this); //按钮绑定事件
			this.autoStart = setInterval(this.nextStart2.bind(this), this.autoTime); //定时器
		}
		
		//遍历所有原点
		for (let j = 0; j < this.navButton.length; j++) {
			this.navButton[j].onclick = this.navButtonClick.bind(this);//按钮绑定事件
		}
	}
	//初始化函数
	resetAllButton() {
		let buttonPosition = this.slideHeight / 2 - 20; //动态得到按钮垂直居中的top值
		this.slide.setAttribute('class', 'slide');
		this.room.style.left = 0 + 'px'; //初始化room的left
		this.room.style.width = this.slideWidth * (this.img.length) + 'px'; //设置room的宽度，等于图片的宽度*图片的数量
		this.room.setAttribute('class', 'room');
		//创建按钮prev
		let prev = document.createElement('div');
		prev.innerHTML = '<';
		prev.setAttribute('class', 'buttonCss prev');
		prev.style.left = 0 + 'px;';
		prev.style.top = buttonPosition + 'px'; //设置按钮垂直居中
		this.slide.appendChild(prev);
		this.up = prev;	//获取prev按钮

		//创建按钮next
		let next = document.createElement('div');
		next.innerHTML = '>';
		next.setAttribute('class', 'buttonCss next');
		next.style.right = 0 + 'px';
		next.style.top = buttonPosition + 'px';	//设置按钮垂直居中
		this.slide.appendChild(next);
		this.down = next; //获取next按钮

		//创建导航原点定位框
		let nav = document.createElement('ul');
		nav.setAttribute('id', 'nav');
		nav.setAttribute('class', 'nav');
		this.slide.appendChild(nav);

		//生成导航原点
		for (let i = 0; i < this.img.length; i++) {
			let navButtonLi = document.createElement('li');
			navButtonLi.setAttribute('class', 'navButton');
			navButtonLi.index = i + 1;
			nav.appendChild(navButtonLi);
		}
		this.navButton = this.slide.getElementsByTagName('li');//获取到所有的li
		this.navButton[0].style.background = '#333'; //初始化第一个点的颜色
	}

	//鼠标进入事件
	onmouseenter() {
		this.down.style.display = 'block';
		this.up.style.display = 'block';
		clearInterval(this.autoStart);
		this.autoStart = null;
	}

	//鼠标离开事件
	onmouseleave() {
		this.down.style.display = 'none';
		this.up.style.display = 'none';
		clearInterval(this.autoStart);
		if (this.mode === '左右滑动') {
			this.autoStart = setInterval(this.nextStart.bind(this), this.autoTime);
		} else if (this.mode === '淡入淡出') {
			this.autoStart = setInterval(this.nextStart2.bind(this), this.autoTime);
		}
	}

	//down按钮事件
	nextStart() {
		clearInterval(this.time);
		let _this = this; // 此处 this == MySlider 取到Myslider
		this.time = setInterval(function () {
			// 此处 this == winsow	
			let left = parseInt(_this.room.style.left);
			if (_this.imgIndex < _this.img.length) {
				if (left > (-_this.slideWidth * _this.imgIndex)) {
					_this.room.style.left = parseInt(_this.room.style.left) + _this.speed + 'px';
				}
				else {
					clearInterval(_this.time);
					_this.room.style.left = -_this.slideWidth * _this.imgIndex + 'px';
					_this.navButton[_this.imgIndex - 1].style.background = '#fff';
					_this.imgIndex++;
					_this.navButton[_this.imgIndex - 1].style.background = '#333';
				}
			}
			else { //在最后一张图片时
				if (left < 0) {
					_this.room.style.left = parseInt(_this.room.style.left) + (-_this.speed * 3) + 'px';
				}
				else {
					clearInterval(_this.time);
					_this.room.style.left = 0 + 'px';
					_this.navButton[_this.imgIndex - 1].style.background = '#fff';
					_this.imgIndex = 1;
					_this.navButton[_this.imgIndex - 1].style.background = '#333';
				}
				
			}
			
		}, 1000/60);
	}

	nextStart2() {
		clearInterval(this.time);
		let _this = this;
		let val = 1;
		let opacity = 0; // 目标透明度
		this.time = setInterval(function () {
			if (val >= opacity) {    
				val -= _this.speed2;
				_this.img[_this.imgIndex - 1].style.opacity = val;
			} else if (val <= 0) {
				_this.img[_this.imgIndex - 1].style.opacity = 1 ;
				if (_this.imgIndex < _this.img.length) {
				_this.room.style.left = -_this.slideWidth * _this.imgIndex + 'px';
				_this.navButton[_this.imgIndex - 1].style.background = '#fff';
				_this.imgIndex++;
				_this.navButton[_this.imgIndex - 1].style.background = '#333';
				}
				else { //在最后一张图片时
					_this.room.style.left = 0 + 'px';
					_this.navButton[_this.imgIndex - 1].style.background = '#fff';
					_this.imgIndex = 1;
					_this.navButton[_this.imgIndex - 1].style.background = '#333';
				}
				clearInterval(_this.time);
			}
		},1000/60);
		} 
	//up按钮事件
	prevStart() {
		clearInterval(this.time);
		let _this = this;
		this.time = setInterval(function() {
			let left = parseInt(_this.room.style.left);
			if (_this.imgIndex == 1) {
				if (left > -_this.slideWidth * (_this.img.length - 1)) {
					_this.room.style.left = left + (_this.speed * 2) + 'px';
				}
				else {
					clearInterval(_this.time);
					_this.room.style.left = -_this.slideWidth * (_this.img.length - 1) + 'px';
					_this.navButton[_this.imgIndex - 1].style.background = '#fff';
					_this.imgIndex = _this.img.length;
					_this.navButton[_this.imgIndex - 1].style.background = '#333';
				}
			}
			else {
				if (left < -(_this.slideWidth * (_this.imgIndex - 1) - _this.slideWidth)) {
					_this.room.style.left = left - _this.speed + 'px';
				}
				else {
					clearInterval(_this.time)
					_this.room.style.left = -(_this.slideWidth * (_this.imgIndex - 1) - _this.slideWidth) + 'px'; //最后位置
					_this.navButton[_this.imgIndex - 1].style.background = '#fff';
					_this.imgIndex--;
					_this.navButton[_this.imgIndex - 1].style.background = '#333';
				}
			}
		}, 1000/60); //60FPS
	}

	prevStart2() {
		clearInterval(this.time);
		let _this = this;
		let val = 1 ;
		let opacity = 0; // 目标透明度
		this.time = setInterval(function () {
			if (val >= opacity) {    
				val -=  _this.speed2;
				_this.img[_this.imgIndex - 1].style.opacity = val;
			} else if (val <= 0) {
				_this.img[_this.imgIndex - 1].style.opacity = 1;
				if(_this.imgIndex === 1){
					_this.room.style.left = -_this.slideWidth * (_this.img.length - 1) + 'px';
					_this.navButton[_this.imgIndex - 1].style.background = '#fff';
					_this.imgIndex = _this.img.length;
					_this.navButton[_this.imgIndex - 1].style.background = '#333';
				}  else {
					_this.room.style.left = -(_this.slideWidth * (_this.imgIndex - 1) - _this.slideWidth) + 'px';
					_this.navButton[_this.imgIndex - 1].style.background = '#fff';
					_this.imgIndex--;
					_this.navButton[_this.imgIndex - 1].style.background = '#333';
					}
				clearInterval(_this.time);
			}
		},1000/60);
	}

	//原点点击事件
	navButtonClick(e) {
		clearInterval(this.time);
		let _this = this;
		let liTarget = e.target; //获取点击的原点
		let val = 1;
		let opacity = 0; // 目标透明度
		if (this.mode === '左右滑动') {
	
			this.time = setInterval(function () {
	
	
				let left = parseInt(_this.room.style.left);
	
				//如果点击的原点位置大于轮播的位置
				if (liTarget.index > _this.imgIndex) {
					if (left > -(_this.slideWidth) * (liTarget.index - 1)) {
						_this.room.style.left = parseInt(_this.room.style.left) + _this.speed * (liTarget.index - _this.imgIndex) + 'px';//相差越远速度越快
					} else {
						clearInterval(_this.time);
						_this.room.style.left = -(_this.slideWidth) * (liTarget.index - 1) + 'px';
						_this.navButtonStyle.call(_this, liTarget); //改变原点样式 
	
	
					}
	
					//如果点击的原点位置小于轮播的位置	
				} else if (liTarget.index < _this.imgIndex) {
					if (left < -_this.slideWidth * (liTarget.index - 1)) {
						_this.room.style.left = parseInt(_this.room.style.left) - _this.speed * (_this.imgIndex - liTarget.index) + 'px';
					} else {
						clearInterval(_this.time);
						_this.room.style.left = (-_this.slideWidth) * (liTarget.index - 1) + 'px';
						_this.navButtonStyle.call(_this, liTarget);
	
					}
				}
			}, 1000 / 60);
		} else if (this.mode === '淡入淡出') {
			this.time = setInterval(function () {
				if (val >= opacity) {
					val -= _this.speed2;
					_this.img[_this.imgIndex - 1].style.opacity = val;
				} else if (val <= 0) {
					clearInterval(_this.time);
					_this.img[_this.imgIndex - 1].style.opacity = 1;
					_this.room.style.left = (-_this.slideWidth) * (liTarget.index - 1) + 'px';
					_this.navButtonStyle.call(_this, liTarget);
				}
			}, 1000 / 60);
		}
	}

	//原点样式改变
	navButtonStyle(liTarget) {
		liTarget.style.background = '#333';
		this.navButton[this.imgIndex - 1].style.background = '#fff';
		this.imgIndex = liTarget.index;
	}

}

//立即执行函数初始化css样式
MySlider.prototype.resetCss = function () {

	//初始化需要的样式
	let createStyle = document.createElement('style');
	/*两个左右按钮公共样式*/
	createStyle.innerHTML += '.buttonCss{font-size:20px;position:absolute;z-index:2;background:rgba(51,51,51,0.4);color:#fff;padding:10px;border-style:none;outline:none;cursor:pointer;display:none;}';
	createStyle.innerHTML += '.room{position:absolute;}'	//初始化room的css
	createStyle.innerHTML += '.slide{font-size:0;overflow:hidden;position:relative;}'	//初始化slide样式
	createStyle.innerHTML += '.nav{padding:0 4px;list-style:none;position:absolute;font-size:0px;background:rgba(222,222,222,0.4);bottom:10px;right:10px;text-align:center;-moz-border-radius:10px;border-radius:10px;}';	//nav样式
	createStyle.innerHTML += '.navButton{display:inline-block;margin:6px 4px;background:#fff;width:8px;height:8px;-moz-border-radius:8px;border-radius:8px;cursor:pointer;}';	//导航点样式
	document.head.appendChild(createStyle);

}();









