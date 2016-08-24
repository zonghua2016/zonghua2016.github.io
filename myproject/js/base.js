/**该文件需要第一个引用*/
(function(window) {
	//可以理解成作用域，，比如文件夹：A文件夹下有a文件，B文件夹下也可以有a文件
	function $package(_sPackage) {
		var nps = _sPackage.split('.');
		var nowScope = window;
		for(var i = 0; i < nps.length; i++) {
			if(!nowScope[nps[i]]) {
				nowScope[nps[i]] = {};
			}
			nowScope = nowScope[nps[i]];
		}
	}
	
	//因为$package函数在闭包环境里，为了可以在其他地方也能使用，所以定义成全局函数
	window.$package=$package;
	
	//定义一个工具包
	$package('yy.tools');
	
	$package('yy.api');
	
	yy.tools.version='1.0';
	
	//方法作用描述
	yy.tools.getClass=function(oParent, name) {
		var tags = oParent.getElementsByTagName("*");
		var arr = [];
		for(var i = 0; i < tags.length; i++) {
			if(tags[i].className == name) {
				arr.push(tags[i]);
			}

		}
		return arr;
	}
	//方法作用描述
	yy.tools.extend=function(obj1, obj2) {
		for(var attr in obj2) {
			obj1[attr] = obj2[attr];
		}
	}
	
	yy.tools.viewHeight=function(){
		 return window.innerHeight || document.documentElement.clientHeight;
	}
	yy.tools.$=function(id){
		return document.getElementById(id);
		
	}
	yy.tools.setStyle=function(obj,att,val){
		obj.style[att]=val;
		obj.style['webkit'+att.substring(0,1).toUpperCase()+att.substring(1)]=val;
	}
  
})(window);

