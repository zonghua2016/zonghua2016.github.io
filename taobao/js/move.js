function doMove(obj, json, d, fx, fn) {
	clearInterval(obj.iTimer);
	var startTime = +new Date();
	
	var j = {};
	
	for (var attr in json) {
		j[attr] = {};
		if (attr == 'opacity') {
			j[attr].b = Math.round(css(obj, attr) * 100);
			j[attr].c = json[attr] - j[attr].b;
		}
		else if(attr == "webkitTransform") {
			j[attr].scaleXb = Math.round(getMatrix(css(obj, attr),0) * 100);
			j[attr].scaleYb = Math.round(getMatrix(css(obj, attr),3) * 100);
			j[attr].translateXb = Math.round(getMatrix(css(obj, attr),4));
			j[attr].translateYb = Math.round(getMatrix(css(obj, attr),5));
			j[attr].scaleXc = getMatrix(json[attr],0)*100 - j[attr].scaleXb;
			j[attr].scaleYc = getMatrix(json[attr],3)*100 - j[attr].scaleYb;
			j[attr].translateXc = getMatrix(json[attr],4) - j[attr].translateXb;
			j[attr].translateYc = getMatrix(json[attr],5) - j[attr].translateYb;
		} 
		else {
			j[attr].b = parseInt(css(obj, attr));
			j[attr].c = json[attr] - j[attr].b;
		}
		
		
	}
	
	//console.log(j);
	
	obj.iTimer = setInterval(function() {
		
		var t = +new Date() - startTime;
		if (t >= d) {
			t = d;
		}
		
		for (var attr in json) {
			if(attr == "webkitTransform"){
				var valueSX = Tween[fx](t,j[attr].scaleXb,j[attr].scaleXc,d)/100;
				var valueSY = Tween[fx](t,j[attr].scaleYb,j[attr].scaleYc,d)/100;
				var valueTX = Tween[fx](t,j[attr].translateXb,j[attr].translateXc,d);
				var valueTY = Tween[fx](t,j[attr].translateYb,j[attr].translateYc,d);
				obj.style[attr] = "matrix(" + valueSX + ",0,0," + valueSY + "," + valueTX +"," + valueTY + ")";

			}
			
		
			else{
				var value = Tween[fx](t, j[attr].b,j[attr].c, d);
				if (attr == 'opacity') {
					obj.style.opacity = value / 100;
					obj.style.filter = 'alpha(opacity='+value+')';
				} else {
					obj.style[attr] = value + 'px';
				}
			}
		}
		
		if (t == d) {
			clearInterval(obj.iTimer);
			fn && fn();
		}
		
	}, 30);
}


function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backOut2: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.2;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
	
}
function getMatrix(str,n){
	var reg =  /(\([^]*\))/;
	return str.match(reg)[0].slice(1,-1).split(",")[n];
}