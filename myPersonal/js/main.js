/**
 * Created by Administrator on 2016/6/1.
 * 个人网站主要js,应用纯原生编写
 */
// JavaScript Document

var oneTimer = null;
var nub = 0;
var num = 0;
var main = document.getElementById('main');
var headerBox = document.getElementById('headerBox');
var h1 = document.getElementById('h1');
var headNav = document.getElementById('headNav');
var navLink = headNav.getElementsByTagName('a');
var navLine = document.getElementById('navLine');
var pageOne = document.getElementById('pageOne');
var pageTwo = document.getElementById('pageTwo');
var pageAll = document.getElementsByClassName('page-all');
var mainOff = true;
var mainHeight = document.documentElement.clientHeight;
var pnub = 1;
var pageOff = true;
var changeOff = true;
var bgList = document.getElementById('bgList');
var lis = bgList.getElementsByTagName('li');
var state = document.getElementById('state');
var pages = state.children;

//窗口大小调整后，再次获取每次滚动高度
window.addEventListener('resize',windowResize);

//第一页canvas动画效果
//requestAnimationFrame兼容问题解决,效果是不错，但是我的电脑cpu是1.6的，使用率达到90%以上，体验很不好，改用间隔定时器
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
})();
//画布运动
function pageOneCavans(){
    var width, height, canvas, ctx, points, target, animateOff = true;
    init();
    initAnimate();
    addListener();

    //初始化函数
    function init(){
        width = window.innerWidth;
        height = window.innerHeight;
        target = {
            x: width/2,
            y: height/2
        };
        canvas = document.getElementById('oneCanvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        points = [];
        for(var x = 0; x < width; x += width/20){
            for(var y = 0; y < height; y += height/20){
                var px = x + Math.ceil(Math.random()*width/20);
                var py = y + Math.ceil(Math.random()*height/20);
                points.push({x: px, originX: px, y: py, originY: py})
            }
        }
        for(var i = 0; i < points.length; i++){
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length;j++){
                var p2 = points[j];
                if(p1 != p2){
                    var off = false;
                    //找到5个点，放到closest数组中
                    for(var k = 0; k < 5; k++){
                        if(!off){
                            if(!closest[k]){
                                closest[k] = p2;
                                off = true;
                            }
                        }
                    }
                    //再遍历剩下的各个点，如果有比之前5个近的，就把原来的替换掉
                    for(var k = 0; k < 5; k++){
                        if(!off){
                            if(getDistance(p1,p2) < getDistance(p1,closest[k])){
                                closest[k] = p2;
                                off = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }
        for(var i in points){
            var c = new Circle(points[i],2*Math.random()*2);
            points[i].Circle = c;
        }
    }

    //运动有关
    //加入缓动的运动函数
    function initAnimate(){
        //animate();
        clearInterval(oneTimer);
        oneTimer = setInterval(animate,100);
        for(var i in points){
            changePoint(points[i]);
        }
    }
    //运动的函数
    function animate(){
        if(animateOff){
            ctx.clearRect(0,0,width,height);
            for(var i in points){
                if(Math.abs(getDistance(points[i],target)) < 4000){
                    points[i].active = 0.3;
                    points[i].Circle.active = 0.6;
                }else  if(Math.abs(getDistance(points[i],target)) < 20000) {
                    points[i].active = 0.1;
                    points[i].Circle.active = 0.3;
                }else  if(Math.abs(getDistance(points[i],target)) < 40000) {
                    points[i].active = 0.02;
                    points[i].Circle.active = 0.1;
                }else {
                    points[i].active = 0;
                    points[i].Circle.active = 0;
                }
                drawLine(points[i]);
                points[i].Circle.draw();
            }
        }
        //requestAnimationFrame(animate);
    }

    //缓动函数，实现动画
    function changePoint(p){
        TweenLite.to(p,1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Tween.easeInOut,
            onComplete: function() {
                changePoint(p);
            }})
    }

    //事件有关
    //添加事件
    function addListener(){
        pageOne.addEventListener('mousemove',move);
        addWheel(main,function (down){
            scrollCheck();
        });
        window.addEventListener('resize',resize);
    }
    //鼠标移动，重新获取中心点
    function move(e){
        var curx = cury = 0;
        if(e.pageX){
            curx = e.pageX;
            cury = e.pageY;
        }else if(e.clientX){
            curx = e.clientX;
            cury = e.clientY;
        }
        target.x = curx;
        target.y = cury;
    }
    function scrollCheck(){
        if(nub != 0){
            animateOff = false;
        }else {
            animateOff = true;
        }
    }
    //浏览器窗口改变时的函数
    function resize(){
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    //画布有关
    //drawLine函数
    function drawLine(p){
        if(!p.active) return;
        ctx.beginPath();
        for(var i in p.closest){
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(226,252,236,'+ p.active+')';
            ctx.stroke();
        }
    }

    //构造一个Circle函数
    function Circle(position,radius){
        this.position = position || 0;
        this.radius = radius || 0;
        this.draw = function (){
            if(!this.active) return;
            ctx.beginPath();
            ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,false);
            ctx.fillStyle = 'rgba(226,252,236,'+ this.active+')';
            ctx.fill();
        };
    }


    //找最近点函数
    function getDistance(p1,p2){
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y,2);
    }
}


//给每一个a标签加一个自定义属性index
for(var i = 0; i < navLink.length; i++){
    navLink[i].dataset.index = i;
}

//main
addWheel(main,function (down){
    if(mainOff){
        if(down){
            mainOff = false;
            //如果是第二页就停止滑动
            if(nub == 1){
                addWheel(main,function (down){
                    if(pageOff){
                        pageOff = false;
                        if(down){
                            pnub--;
                            if(pnub == 0){
                                nub--;
                                navLineScroll();
                                rotate(15,1,true);
                                pageScroll(main);
                                return ;
                            }
                            changePages();
                            changeBg();
                            timeOut();
                        }else {
                            pnub++;
                            if(pnub == 5){
                                nub++;
                                navLineScroll();
                                rotate(15,1,true);
                                pageScroll(main);
                                return ;
                            }
                            changePages();
                            changeBg();
                            timeOut();
                        }
                    }
                });
                return;
            }
            nub--;
            if(nub < 0){
                nub = 0;
            }else{
                rotate(15,1,true)
            }
            navLineScroll();
            pageScroll(main);
        }else {
            mainOff = false;
            //如果是第二页就停止滑动
            if(nub == 1){
                addWheel(pageTwo,function (down){
                    if(pageOff){
                        pageOff = false;
                        if(down){
                            pnub--;
                            if(pnub == 0){
                                nub--;
                                navLineScroll();
                                rotate(15,1,true);
                                pageScroll(main);
                                return ;
                            }
                            changePages();
                            changeBg();
                            timeOut();
                        }else {
                            pnub++;
                            if(pnub == 5){
                                nub++;
                                navLineScroll();
                                rotate(15,1,true);
                                pageScroll(main);
                                return ;
                            }
                            changePages();
                            changeBg();
                            timeOut();
                        }
                    }
                });
                return;
            }
            nub++;
            if(nub > 3){
                nub = 3;
            }else {
                rotate(15,1,true)
            }
            navLineScroll();
            pageScroll(main);
        }
    }
});

//给#headNav添加鼠标移入移出事件，用事件委托的方法触发a标签的事件
headNav.addEventListener('mouseover',navHover);
headNav.addEventListener('mouseout',navOut);
//给#headNav添加点击事件
for(var i = 0; i < navLink.length; i++){
    navLink[i].addEventListener('click',navLinkClick)
}
//给小蜗牛添加点击事件回主页
h1.onclick = function (){
    if(nub == 0) return;
    nub = 0;
    navLineScroll();
    rotate(15,1,true);
    pageScroll(main);
    scrollCheck();
};


//给第二页下方小按钮添加点击事件
var nextBtn = pageTwo.getElementsByClassName('nextBtn')[0];
nextBtn.onclick = function (){
    nub++;
    navLineScroll();
    rotate(15,1,true);
    pageScroll(main);
    scrollCheck();
};

//第三页操作
function pageThree(){
    var off = true;
    var pageThree = document.getElementById("pageThree");
    var listBox = document.getElementById("listBox");
    var divs = pageThree.children;
    //console.log(divs.length)
    var p1 = document.getElementsByClassName("p1")[0];
    var p2 = document.getElementsByClassName("p2")[0];
    var p3 = document.getElementsByClassName("p3")[0];
    var p4 = document.getElementsByClassName("p4")[0];
    var p5 = document.getElementsByClassName("p5")[0];
    var p6 = document.getElementsByClassName("p6")[0];
    var p7 = document.getElementsByClassName("p7")[0];
    var p8 = document.getElementsByClassName("p8")[0];
    var w = window.innerWidth;
    var h = window.innerHeight;
    var lis = listBox.getElementsByTagName('li');
    var arrW = [10,30,50,70];
    for(var i = 0; i < divs.length - 1; i++){
            var left = divs[i].offsetLeft;
            var top = divs[i].offsetTop;
        //console.log(top)
            divs[i].style.right = 0;
            divs[i].style.left = left + "px";
            divs[i].style.top = top + "px";
            divs[i].indexW = left;
            divs[i].indexH = top;
    }

    pageThree.onmousemove = function (ev) {
        var e = window.event || ev;
        var scale = 0.5 - (e.clientX / w);
        var scaleY = 0.5 - (e.clientY / h);
        p1.style.left = parseFloat(p1.indexW) + arrW[3]*scale + "px";
        p1.style.top = parseFloat(p1.indexH) + arrW[3]*scaleY + "px";
        p2.style.left = parseInt(p2.indexW) + arrW[1]*scale + "px";
        p2.style.top = parseInt(p2.indexH) + arrW[1]*scaleY + "px";
        p3.style.left = parseInt(p3.indexW) + arrW[0]*scale + "px";
        p3.style.top = parseInt(p3.indexH) + arrW[0]*scaleY + "px";
        p4.style.left = parseInt(p4.indexW) + arrW[1]*scale + "px";
        p4.style.top = parseInt(p4.indexH) + arrW[1]*scaleY + "px";
        p5.style.left = parseInt(p5.indexW) + arrW[1]*scale + "px";
        p5.style.top = parseInt(p5.indexH) + arrW[1]*scaleY + "px";
        p6.style.left = parseInt(p6.indexW) + arrW[2]*scale + "px";
        p6.style.top = parseInt(p6.indexH) + arrW[2]*scaleY + "px";
        p7.style.left = parseInt(p7.indexW) + arrW[3]*scale + "px";
        p7.style.top = parseInt(p7.indexH) + arrW[3]*scaleY + "px";
        p8.style.left = parseInt(p8.indexW) + arrW[1]*scale + "px";
        p8.style.top = parseInt(p8.indexH) + arrW[1]*scaleY + "px";
        if(off){
            listBox.style.transform = 'rotateX('+arrW[1] * scaleY/2+'deg) rotateY('+arrW[0] * scale+'deg)';
        }
    };
    listBox.onmousemove = function (){
        off = false;
        listBox.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };
    listBox.onmouseout = function (){
        off = true;
    };
    for(var i = 0; i < lis.length; i++){
        lis[i].onmouseenter = function (){
            this.style.background = "red";
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 20px #333';
        };
        lis[i].onmouseleave = function (){
            this.style.background = "";
            this.style.transform = '';
            this.style.boxShadow = '';
        };
    }
}

//第四页操作
var off = true;
function pageFour(){
    var pageFour = document.getElementById('pageFour');
    var text = pageFour.getElementsByClassName('content')[0];
    var ps = text.getElementsByTagName('p');
    var str = '电话：18600279664 Email: 2280314971@qq.com 地址：北京朝阳区奶西村';
    var timer = null;
    var number = -1;
    var content = {
        element: text,
        time: 500,
        target: {
            opacity: 100,
            bottom: -230
        },
        type: 'easeBoth',
        callBack: function (){
            if(off){
                off = false;
                timer = setInterval(function (){
                    number++;
                    if(number >= str.indexOf('地')){
                        ps[2].innerHTML += str.charAt(number);
                    }else if(number >= str.indexOf('E')){
                        ps[1].innerHTML += str.charAt(number);
                    }else {
                        ps[0].innerHTML += str.charAt(number);
                    }
                    if(number == str.length){
                        clearInterval(timer);
                    }
                },50)
            }
        }
    };
    var call = {
        element: document.getElementsByClassName('call')[0],
        time: 500,
        target: {
            opacity: 100,
            top: 0
        },
        type: 'elasticOut',
        callBack: function (){
            cTween(content);
        }
    };
    cTween(call);
}



//滚动检查
function scrollCheck(){
    if(nub != 0){
        animateOff = false;
    }else {
        animateOff = true;
    }
}
//封装滚轮事件函数
function addWheel(obj,fn){
    var types = window.navigator.userAgent.toLowerCase();
    if(types.indexOf('firefox') != -1){
        obj.addEventListener('DOMMouseScroll',fndown)
    }else{
        obj.addEventListener('mousewheel',fndown);
    }
    function fndown(ev){
        var down = true;
        if(ev.wheelDelta){
            down = ev.wheelDelta > 0? true: false;
        }else if(ev.detail){
            down = ev.detail < 0? true: false;
        }
        typeof fn === 'function' && fn(down);
        ev.preventDefault();
    }
}

//窗口调整函数
function windowResize(){
    mainHeight = document.documentElement.clientHeight;
    for(var i = 0; i < pageAll.length; i++){
        pageAll[i].style.height = mainHeight + 'px';
    }
    main.style.height = mainHeight + 'px';
    main.style.top = -nub*mainHeight + 'px';
}

//滚屏函数
function pageScroll(ele){
    var obj = {
        element: ele,
        time: 500,
        target: {top: -nub*mainHeight},
        type: 'easeOut',
        callBack: function (){
            rotate(0,-1,false);
            pnub = 1;
            pageOff = true;
            changePages();
            changeBg();
        }
    };
    cTween(obj);
}

//导航旋转效果函数
function rotate(deg,value,bl){
    var timer = null;
    timer = setInterval(function (){
        num += value;
        headerBox.style.transform = 'rotateX('+num+'deg)';
        if(bl){
            if(num >= deg){
                headerBox.style.transform = 'rotateX('+deg+'deg)';
                clearInterval(timer);
            }
        }else {
            if(num <= deg){
                headerBox.style.transform = 'rotateX('+deg+'deg)';
                clearInterval(timer);
                //导航旋转重新恢复到初始状态时，才可以进行翻页
                mainOff = true;
                //如果是倒数第二页
                //如果是最后一页
                if(nub == 0){
                    pageOneCavans();
                }else if (nub == 2){
                    pageThree();
                }else if(nub == 3){
                    pageFour();
                }
            }
        }

    },30)
}

//导航条的移动涉及的所有函数
function navHover(ev){
    for(var i = 0; i < navLink.length; i++){
        navLink[i].id = '';
    }
    var ele = ev.target;
    var linkleft;
    switch(ele.dataset.index){
        case '0':
            linkleft = navLink[0].offsetLeft;
            navLink[0].id = 'hover';
            navLine.style.left = linkleft + 'px';
            break;
        case '1':
            linkleft = navLink[1].offsetLeft;
            navLink[1].id = 'hover';
            navLine.style.left = linkleft + 'px';
            break;
        case '2':
            linkleft = navLink[2].offsetLeft;
            navLink[2].id = 'hover';
            navLine.style.left = linkleft + 'px';
            break;
        case '3':
            linkleft = navLink[3].offsetLeft;
            navLink[3].id = 'hover';
            navLine.style.left = linkleft + 'px';
            break;
        default :
            linkleft = navLink[0].offsetLeft;
            navLink[0].id = 'hover';
            navLine.style.left = linkleft + 'px';
    }
}

function navOut(){
    for(var i = 0; i < navLink.length; i++){
        navLink[i].id = '';
    }
    var linkleft = navLink[nub].offsetLeft;
    navLink[nub].id = 'hover';
    navLine.style.left = linkleft + 'px';
}

function navLineScroll(){
    for(var i = 0; i < navLink.length; i++){
        navLink[i].id = '';
    }
    var linkleft = navLink[nub].offsetLeft;
    navLink[nub].id = 'hover';
    navLine.style.left = linkleft + 'px';
}

function navLinkClick(){
    if(nub == this.dataset.index) return;
    nub = this.dataset.index;
    navLineScroll();
    rotate(15,1,true);
    pageScroll(main);
    scrollCheck();
}

//第二页技能展示相关函数

function changeBg(){
    for(var i = 0; i < lis.length; i++){
            lis[i].style.opacity = 0;
    }
    lis[lis.length - pnub].style.opacity = 1;
}
function changePages(){
    for(var i = 0; i < pages.length; i++){
        pages[i].className = 'status0';
    }
    pages[pnub-1].className = 'status1';
}
function timeOut(){
    var timer = setTimeout(function (){
        pageOff = true;
        clearTimeout(timer);
    },1000)
}
