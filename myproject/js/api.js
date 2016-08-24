(function(window) {
	//定义一个工具包
	$package('yy.api');
	//===========================================================================================
	function Tab(id, opt) { //构造函数，里面是对象的属性和默认参数
		this.oNav = null; //导航；
		this.oArrow = null; //导航下的箭头；
		this.aNavLi = null; //导航里的li；
		this.oContent = null; //导航下的内容区域的父级；
		this.oHeader = null; //整个页面的头部；
		this.oConMain = null; //主要内容是个定位的ul；
		this.aConlist = null; //主要内容列表；
		this.index = 0; //当前索引；
		this.onOff = true; //开关；
		this.timer = null; //定时期名称；
		this.oNavList = null; //侧边栏导航的父级列表；
		this.aNavlistLi = null; //侧边栏导航里的li;
		this.aDivList = null; //每一屏的主体内容的父级；
		this.data = null;
		this.preNum = 0;
		this.oMusic = null;
		this.oAudio = null;
		this.musicOn = null;
		this.count = 0;
		this.setting = {
			arrow: false,
			events: 'onclick',
		}

		this.init(id, opt);
	}
	Tab.prototype = {
		init: function(id, opt) { //初始化方法；进行按下的效果操作；
			var that = this;
			this.oNav = yy.tools.$(id);
			this.oHeader = yy.tools.$('header');
			this.aNavLi = this.oNav.getElementsByTagName('li');
			yy.tools.extend(this.setting, opt);
			var oAbove = this.aNavLi[0].getElementsByTagName('div')[0];
			oAbove.style.width = '100%';
			if(opt.animation) {
				this.outInMove();
				for(var i = 0; i < this.data.length; i++) {
					this.data[i].Out();
				}
				this.preLoading();
			}
			if(music) {
				this.musicPlay();
			}

			if(opt.arrow) {
				this.oArrow = yy.tools.getClass(this.oHeader, 'arrow')[0];
				this.oArrow.style.left = this.aNavLi[0].offsetLeft + this.aNavLi[0].offsetWidth / 2 - this.oArrow.offsetWidth / 2 + 'px';
			}
			for(var i = 0; i < this.aNavLi.length; i++) {
				this.aNavLi[i].index = i;
				this.aNavLi[i][opt.events[0]] = function() {

					if(opt.con) {
						that.preNum = that.index;
						that.fullScreen(this); //如果存在切换屏幕，执行计算屏幕的大小
						that.index = this.index; //获取点击的index；

					}
					that.change(that.index); //导航栏效果的函数；
					that.bannerTools(that.index); //侧边栏效果；
					that.data[that.preNum].Out();
					that.data[that.index].In();
				}
			}

			if(opt.con) { //如果有内容存在在执行此操作；
				this.viewchange();
				that.onScroll(); //执行滚轮操作；
				that.EveryContentMargin();
			}
			window.onresize = function() { //尺寸变化时；
				that.viewchange();
				that.fullScreen(that.index);
				that.EveryContentMargin();
			}
			if(opt.banner) {
				this.bannerChange();
			}
		},
		preLoading: function() { //预加载；
			var that = this;
			var oLoad = yy.tools.$('load');
			var aDiv = oLoad.getElementsByTagName('div');
			var oSpan = oLoad.getElementsByTagName('span')[0];
			var arr = ['bg1.jpg'/*tpa=http://115.28.73.247:6060/yy/js/bg1.jpg*/, 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'team.png',
				/*'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg',*/ 'cell1.jpg', 'cell2.jpg', 'cell3.jpg', 'cell4.jpg', 'home1.jpg',
				'home2.jpg', 'home3.jpg', 'home4.jpg', 'home5.jpg', 'sky1.jpg', 'sky2.jpg', 'sky3.jpg', 'sky4.jpg'
			];
			for(var i = 0; i < arr.length; i++) { //循环生成img对象；
				var oImg = new Image();
				oImg.src = 'yyOneimg/' + arr[i];
				oImg.onload = function() { //img的加载事件；
					that.count++; //每加载一张就做个标记
					oSpan.style.width = that.count / arr.length * 100 + '%';
				}
			}
			oSpan.addEventListener('webkitTransitionend', auto, false); //运动完所要执行的；
			oSpan.addEventListener('transitionend', auto, false);

			function auto() {
				var aDiv = oLoad.getElementsByTagName('div');
				if(oSpan.style.width == '100%') {
					aDiv[0].style.height = 0;
					aDiv[1].style.height = 0;
					oSpan.style.display = 'none';
					that.data[0].In();
				}
			}
			aDiv[0].addEventListener('webkitTransitionend', start, false); //div运行完所要执行；
			aDiv[0].addEventListener('transitionend', start, false);

			function start() {
				var oLoad = yy.tools.$('load'); //删除load，不然会无法点击下面的页面；
				var aDiv = oLoad.getElementsByTagName('div');
				oLoad.parentNode.removeChild(oLoad);
				that.musicAuto();
			}
		},
		change: function(index) { //事件处理函数；获取当前触发对象的值，进行操作；
			var L = this.aNavLi[index].offsetLeft;
			if(this.setting.arrow) {
				this.oArrow.style.left = L + this.aNavLi[index].offsetWidth / 2 - this.oArrow.offsetWidth / 2 + 'px';
			}
			for(var i = 0; i < this.aNavLi.length; i++) {
				var aAbove = this.aNavLi[i].getElementsByTagName('div')[0];
				aAbove.style.width = '';
			}
			var oDiv = this.aNavLi[index].getElementsByTagName('div')[0];
			oDiv.style.width = '100%';
		},
		viewchange: function() { //获取内容的高度；
			this.oContent = yy.tools.$('content'); //获取内容父级;
			this.oConMain = yy.tools.getClass(this.oContent, 'content-main')[0];
			this.aConlist = yy.tools.getClass(this.oConMain, 'con-list');
			this.oContent.style.height = yy.tools.viewHeight() - this.oHeader.offsetHeight + 'px'; //用可视区的高度减去头部的高度等于内容的高度；
			this.oConMain.style.height = yy.tools.viewHeight() - this.oHeader.offsetHeight + 'px';
			for(var i = 0; i < this.aConlist.length; i++) {
				this.aConlist[i].style.height = yy.tools.viewHeight() - this.oHeader.offsetHeight + 'px';
			}
		},
		fullScreen: function(that) {
			var iConHeight = yy.tools.viewHeight() - this.oHeader.offsetHeight;
			if(that == this.index) { //判断that的参数值，来执行大小；
				this.oConMain.style.top = -that * iConHeight + 'px';
			} else {
				this.oConMain.style.top = -that.index * iConHeight + 'px';
			}

		},
		EveryContentMargin: function() { //自动算出每一屏内容的margin值；在每一屏居中显示；
			this.aDivList = yy.tools.getClass(this.oConMain, 'divList');
			var marginTop = (this.aConlist[0].offsetHeight - this.aDivList[0].offsetHeight) / 2
			for(var i = 0; i < this.aDivList.length; i++) {
				this.aDivList[i].style.marginTop = marginTop + 'px';
			}

		},
		onScroll: function() { //滚轮事件处理函数。通过滚轮切换屏幕；
			var _this = this;
			if(this.oContent.addEventListener) { //滚轮操作的兼容写法；
				this.oContent.addEventListener('DOMMouseScroll', function(ev) {
					clearTimeout(_this.timer);
					var ev = ev || window.event;
					_this.timer = setTimeout(function() { //延时操作是为了解决快速滑动
						_this.changeDetail(ev);
					}, 100)
				}, false);
			}
			this.oContent.onmousewheel = function(ev) { //延时操作是为了解决快速滑动
				clearTimeout(_this.timer);
				var ev = ev || window.event;
				_this.timer = setTimeout(function() {
					_this.changeDetail(ev);

				}, 100);

			}
		},
		changeDetail: function(ev) { //根据滚轮向上向下的值统一一个布尔值；通过布尔值来判断是上滑动还是向下滑动；
			if(ev.detail) {
				this.onOff = ev.detail > 0 ? true : false;
			} else {
				this.onOff = ev.wheelDelta < 0 ? true : false;
			}
			this.preNum = this.index;
			if(this.onOff) { //根据索引进行操作;
				if(this.index < this.aConlist.length - 1) {
					this.index++;
				}

				this.fullScreen(this.index);
				this.change(this.index);
				this.bannerTools(this.index);
				this.data[this.preNum].Out();
				this.data[this.index].In();

			} else {
				if(this.index > 0) {
					this.index--;
				}
				this.fullScreen(this.index);
				this.change(this.index);
				this.bannerTools(this.index);
				this.data[this.preNum].Out();
				this.data[this.index].In();

			}
		},

		bannerChange: function() { //侧边栏控制切换屏幕
			var _this = this;
			this.oNavList = yy.tools.$('nav-list');
			this.aNavlistLi = this.oNavList.getElementsByTagName('li');
			for(var i = 0; i < this.aNavlistLi.length; i++) {
				this.aNavlistLi[i].index = i;
				this.aNavlistLi[i].onclick = function() {
					_this.preNum = _this.index;
					_this.index = this.index;
					_this.bannerTools(_this.index);
					_this.fullScreen(this.index);
					_this.change(this.index);
					_this.data[_this.preNum].Out();
					_this.data[_this.index].In();

				}
			}
		},
		bannerTools: function(index) { //实现的方法；
			for(var i = 0; i < this.aNavlistLi.length; i++) {
				this.aNavlistLi[i].className = '';
			}
			this.aNavlistLi[index].className = 'active';
		},
		outInMove: function() { //动画的出场和入场方式；
			var that = this;
			this.oContent = yy.tools.$('content'); //获取内容父级;
			this.oConMain = yy.tools.getClass(this.oContent, 'content-main')[0];
			this.aDivList = yy.tools.getClass(this.oConMain, 'divList');
			var oMovePic = yy.tools.getClass(this.aDivList[0], 'movePic')[0];
			var oChangeBtn = yy.tools.getClass(this.aDivList[0], 'changeBtn')[0];
			var oPlane1 = yy.tools.getClass(this.aDivList[1], 'plane1')[0];
			var oPlane2 = yy.tools.getClass(this.aDivList[1], 'plane2')[0];
			var oPlane3 = yy.tools.getClass(this.aDivList[1], 'plane3')[0];
			var oPencil1 = yy.tools.getClass(this.aDivList[2], 'pencil1')[0];
			var oPencil2 = yy.tools.getClass(this.aDivList[2], 'pencil2')[0];
			var oPencil3 = yy.tools.getClass(this.aDivList[2], 'pencil3')[0];
			var oSlicePic = yy.tools.getClass(this.aDivList[3], 'slicePic')[0];
			var aCellImg = yy.tools.getClass(oSlicePic, 'cellImg');
			var oIntroduce = yy.tools.getClass(this.aDivList[4], 'introduce')[0];
			var oText = yy.tools.getClass(this.aDivList[4], 'text')[0];
			this.data = [{
				In: function() {
					oMovePic.style.opacity = 1;
					yy.tools.setStyle(oMovePic, 'transform', 'translate(0,0)');
					yy.tools.setStyle(oChangeBtn, 'transform', 'translate(0,0)');
				},

				Out: function() {
					oMovePic.style.opacity = 0;
					yy.tools.setStyle(oMovePic, 'transform', 'translate(0,-150px)');
					yy.tools.setStyle(oChangeBtn, 'transform', 'translate(0,100px)');
				}
			}, {
				In: function() {

					yy.tools.setStyle(oPlane1, 'transform', 'translate(0,0)');
					yy.tools.setStyle(oPlane2, 'transform', 'translate(0,0)');
					yy.tools.setStyle(oPlane3, 'transform', 'translate(0,0)');
				},

				Out: function() {

					yy.tools.setStyle(oPlane1, 'transform', 'translate(-200px,-200px)');
					yy.tools.setStyle(oPlane2, 'transform', 'translate(-200px,200px)');
					yy.tools.setStyle(oPlane3, 'transform', 'translate(200px,-200px)');
				}
			}, {
				In: function() {

					yy.tools.setStyle(oPencil1, 'transform', 'translate(0,0)');
					yy.tools.setStyle(oPencil2, 'transform', 'translate(0,0)');
					yy.tools.setStyle(oPencil3, 'transform', 'translate(0,0)');
				},

				Out: function() {

					yy.tools.setStyle(oPencil1, 'transform', 'translate(0,-200px)');
					yy.tools.setStyle(oPencil2, 'transform', 'translate(0,200px)');
					yy.tools.setStyle(oPencil3, 'transform', 'translate(0,200px)');
				}
			}, {
				In: function() {

					yy.tools.setStyle(aCellImg[0], 'transform', 'rotate(0)');
					yy.tools.setStyle(aCellImg[1], 'transform', 'rotate(0)');

				},

				Out: function() {

					yy.tools.setStyle(aCellImg[0], 'transform', 'rotate(45deg)');
					yy.tools.setStyle(aCellImg[1], 'transform', 'rotate(-45deg)');

				}

			}, {
				In: function() {
					oIntroduce.style.opacity = 1;
					oText.style.opacity = 1;
					yy.tools.setStyle(oIntroduce, 'transform', 'translate(0,0)');
					yy.tools.setStyle(oText, 'transform', 'translate(0,0)');

				},

				Out: function() {
					oIntroduce.style.opacity = 0;
					oText.style.opacity = 0;
					yy.tools.setStyle(oIntroduce, 'transform', 'translate(-200px,0)');
					yy.tools.setStyle(oText, 'transform', 'translate(200px,0)');

				}

			}];

		},
		musicPlay: function() {
			var that = this;
			this.musicOn = true;
			this.oAudio = yy.tools.$('audio');
			this.oMusic = yy.tools.$('music');
			this.oMusic.onclick = function() {
				that.musicAuto();
			}
		},
		musicAuto: function() {
			if(this.musicOn) {
				this.oMusic.style.backgroundImage = 'url(yyOneimg/musicon.gif)';
				this.oAudio.play();
			} else {
				this.oMusic.style.backgroundImage = 'url(yyOneimg/musicoff.gif)';
				this.oAudio.pause();
			}
			this.musicOn = !this.musicOn;
		}

	}
	yy.api.Tab = Tab;
	//===========================================================================================
})(window);

(function(window) { //第1屏的方法；
	$package('yy/js/yy.api');

	function home() {
		clickLi();

	}

	function clickLi() { //点击列表的切换
		var oDivlist = yy.tools.$('sOne'); //内容父级
		var oChangeBtn = yy.tools.getClass(oDivlist, 'changeBtn')[0]; //按钮列表的父级
		var aLi = oChangeBtn.getElementsByTagName('li'); //找到每一个按钮列表
		var oMovePic = yy.tools.getClass(oDivlist, 'movePic')[0]; //图片列表的父级
		var aPicLi = oMovePic.getElementsByTagName('li'); //放每一张图片的li；
		var iNow = 0; //当前的索引值；
		var num = 0;
		var timer = null;
		timer = setInterval(auto, 3000);
		for(var i = 0; i < aLi.length; i++) {
			aLi[i].index = i;
			aLi[i].onclick = function() { //点击按钮的方法，调用效果的封装函数；
				demo(this.index);
			}

		}
		oDivlist.onmouseover = function() { //移入关闭定时器
			clearInterval(timer);
		}
		oDivlist.onmouseout = function() { //移出开启；
			timer = setInterval(auto, 3000);
		}

		function auto() { //自动播放；
			num++;
			if(num > aLi.length - 1) {
				num = 0;
			}
			demo(num);
		}

		function demo(index) { //效果的封装函数；

			for(var i = 0; i < aPicLi.length; i++) {
				aLi[i].className = '';
			}
			aLi[index].className = 'active';
			if(iNow != index) { //只有索引不等于当前的index值才执行切换
				if(iNow < index) { //小于时当前的从右边显示，iNow从左边隐藏；
					aPicLi[iNow].className = 'leftHide';
					aPicLi[index].className = 'rightShow';
				} else { //iNow大于时当前的索引值时,当前的从左边边显示，iNow从右边隐藏；
					aPicLi[iNow].className = 'rightHide';
					aPicLi[index].className = 'leftShow';
				}
				iNow = index;
				num = index;
			}
		}

	}

	yy.api.home = home;
})(window);
(function(window) {
	$package('http://115.28.73.247:6060/yy/js/yy.api');

	function screenTwo() { //第二屏的方法；

		create();

	}

	function create() { //自动生成元素；
		var oPage = yy.tools.$('page');
		var oDivList = yy.tools.getClass(oPage, 'divList')[0];
		var data = [{
			'url': 'yyOneimg/logo1.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo1.png*/,
			'text': '仝宗华 男 25岁'
		}, {
			'url': 'yyOneimg/logo2.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo2.png*/,
			'text': '专业：计算机'
		}, {
			'url': 'yyOneimg/logo3.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo3.png*/,
			'text': '对js很感兴趣'
		}, {
			'url': 'yyOneimg/logo4.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo4.png*/,
			'text': 'getByClass的封装'
		}, {
			'url': 'yyOneimg/logo5.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo5.png*/,
			'text': '面向对象'
		}, {
			'url': 'yyOneimg/logo6.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo6.png*/,
			'text': 'jquery'
		}, {
			'url': 'yyOneimg/logo7.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo7.png*/,
			'text': 'Html5'
		}, {
			'url': 'yyOneimg/logo8.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo8.png*/,
			'text': 'css3'
		}, {
			'url': 'yyOneimg/logo9.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo9.png*/,
			'text': 'javascript'
		}, {
			'url': 'yyOneimg/logo10.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo10.png*/,
			'text': 'JSON'
		}, {
			'url': 'yyOneimg/logo11.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo11.png*/,
			'text': 'transiton'
		}, {
			'url': 'yyOneimg/logo12.png'/*tpa=http://115.28.73.247:6060/yy/js/yyOneimg/logo12.png*/,
			'text': 'animation'
		}];
		var oDiv = document.createElement('div');
		oDiv.className = 'logo-show';
		for(var i = 0; i < 5; i++) {
			var oLine = document.createElement('div');
			oLine.className = 'lines';
			oLine.style.left = i * 120 + 'px';
			oDiv.appendChild(oLine);
		}
		for(var i = 0; i < data.length; i++) {
			var oLogoPic = document.createElement('div');
			oLogoPic.className = 'logopic';
			oLogoPic.innerHTML = '<div class="rBefore" style="background:url(' + data[i].url + ') no-repeat"></div><div class="rAfter">' + (data[i].text) + '</div>';
			oDiv.appendChild(oLogoPic);
		}
		oDivList.appendChild(oDiv);

	}

	yy.api.screenTwo = screenTwo;
})(window);

(function(window) { //number Three;
	$package('yy/js/yy.api');

	function screenThree() {
		create();
	}

	function create() { //动态生成标签元素；
		var oSky = yy.tools.$('sky');
		var opicChange = yy.tools.getClass(oSky, 'picChange')[0];
		var data = [{
			'url': 'yyOneimg/sky1.jpg',
			'text': 'keyframes'
		}, {
			'url': 'yyOneimg/sky2.jpg',
			'text': 'animation'
		}, {
			'url': 'yyOneimg/sky3.jpg',
			'text': 'transform'
		}, {
			'url': 'yyOneimg/sky4.jpg',
			'text': 'rotate translate transition'
		}];
		for(var i = 0; i < data.length; i++) {
			var oLi = document.createElement('li');
			oLi.innerHTML = '<img src=' + data[i].url + ' class="pic"/><div class="mask"><span>' + data[i].text + '</span><div></div></div>';
			opicChange.appendChild(oLi);
		}

	}

	yy.api.screenThree = screenThree;
})(window);
(function(window) {
	$package('http://115.28.73.247:6060/yy/js/yy.api');

	function screenFour() {
		var oCell = yy.tools.$('cell');
		var oSlicePic = yy.tools.getClass(oCell, 'slicePic')[0];
		var aCellImg = yy.tools.getClass(oSlicePic, 'cellImg');

		for(var i = 0; i < aCellImg.length; i++) {
			create(aCellImg[i]);
		}
	}

	function create(cellImg) {
		var oUl = cellImg.getElementsByTagName('ul')[0];
		var aShowPic = yy.tools.getClass(cellImg, 'showPic')[0];
		var oShowImg = aShowPic.getElementsByTagName('img')[0];

		var w = cellImg.clientWidth / 2;
		var h = cellImg.clientHeight / 2;
		for(var i = 0; i < 4; i++) {
			var oLi = document.createElement('li');
			oLi.style.width = w + 'px';
			oLi.style.height = h + 'px';
			var oImg = document.createElement('img');
			oImg.src = oUl.dataset.src;
			oImg.style.left = i % 2 * -w + 'px';
			oImg.left = i % 2 * -w;
			oImg.style.top = Math.floor(i / 2) * -h + 'px';
			oImg.top = Math.floor(i / 2) * -h;
			oLi.appendChild(oImg);
			oUl.appendChild(oLi);
		}
		var data = [{
			'name': 'top',
			'value': h
		}, {
			'name': 'left',
			'value': -w * 2
		}, {
			'name': 'left',
			'value': w
		}, {
			'name': 'top',
			'value': -h * 2
		}, ]
		var aImg = oUl.getElementsByTagName('img');
		cellImg.onmouseover = function() {
			for(var i = 0; i < aImg.length; i++) {
				aImg[i].style[data[i].name] = data[i].value + 'px';

			}
			yy.tools.setStyle(oShowImg, 'transform', 'scale(1)');
		}
		cellImg.onmouseout = function() {
			for(var i = 0; i < aImg.length; i++) {
				aImg[i].style[data[i].name] = aImg[i][data[i].name] + 'px';

			}
			yy.tools.setStyle(oShowImg, 'transform', 'scale(1.5)');
		}

	}

	yy.api.screenFour = screenFour;
})(window);
(function(window) {
	$package('yy/js/yy.api');

	function screenFive() {
		create();
	}

	function create() {
		var oTeam = yy.tools.$('Team');
		var oContent = yy.tools.getClass(oTeam, 'content')[0];
		var oUl = document.createElement('ul');

		for(var i = 0; i < 8; i++) {
			var oLi = document.createElement('li');
			oLi.style.background = 'url(yyOneimg/team.png) no-repeat';
			oLi.style.backgroundPosition = -i * 116 + 'px 0';
			oUl.appendChild(oLi);
		}
		oContent.appendChild(oUl);
		var aLi = oContent.getElementsByTagName('li');
		for(var i = 0; i < aLi.length; i++) {
			aLi[i].onmouseover = function() {
				for(var i = 0; i < aLi.length; i++) {
					aLi[i].style.opacity = '0.5';
				}
				this.style.opacity = 1;
			}
		}

		oContent.onmouseout = function() {
			for(var i = 0; i < aLi.length; i++) {
				aLi[i].style.opacity = '1';
			}
		}

	}
	yy.api.screenFive = screenFive;
})(window);
//(function(window){//音乐和预加载的方法；
//	$package('http://115.28.73.247:6060/yy/js/yy.api');
//	function Preloading(){
//		music();
//	}
//	function music(){
//		var onOff=true;
//		var oMusic=yy.tools.$('music');
//		var oAudio=yy.tools.$('audio');
//		oMusic.onclick=function(){
//			if(onOff){
//			oMusic.style.backgroundImage='url(yyOneimg/musicon.gif)';
//			oAudio.play();
//		   }else{
//			oMusic.style.backgroundImage='url(yyOneimg/musicoff.gif)';
//			oAudio.pause();
//		   }
//		   onOff=!onOff;
//		   
//		}
//		
//	}
//	yy.api.preloading = Preloading;
//})(window)