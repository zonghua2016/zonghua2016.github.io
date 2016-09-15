$(function(){
	//导航条下的滚动条
	$li=$('#navList li');
	$span=$('#rollSpan')
	
	
	$li.hover(function(){
		$span.css('width',$(this).width()).stop().animate({'left':$(this).position().left},300);
	},function(){
		$liActive=$('#navList li.active');
		$span.css('width',$liActive.width()).stop().animate({'left':$liActive.position().left},300);
	})
	$li.click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
	//banner图片轮播
	$banner=$('#banner');
	$banLi=$('#banImg li');
	$banImg=$('#banImg li img');
	$arrowLeft=$('#arrowLeft');
	$arrowRight=$('#arrowRight');
	$dotSpan=$('#dot span');
	var iNow=0;
	var bannerTimer;
	runBanner();
	function runBanner(){
		bannerTimer=setInterval(function(){
		setiNow();
		},2000)
	}
	function setiNow(){
		if(iNow==3){
			iNow=0;
		}else{
			iNow++;
		}
		for(var i=0;i<$banImg.length;i++){
			$banImg.eq(i).animate({'opacity':0},300);
		}
		$banImg.eq(iNow).animate({'opacity':1},300);
		$dotSpan.eq(iNow).css({'background':'#ccc'}).siblings().css({'background':'#fff'});
	}
	$banner.hover(function(){
		clearInterval(bannerTimer);
	},function(){
		runBanner();
	})
	$arrowLeft.click(function(){
		if(iNow==0){
			iNow=3;
		}else{
			iNow--;
		}
		for(var i=0;i<$banImg.length;i++){
			$banImg.eq(i).animate({'opacity':0},300);
		}
		$banImg.eq(iNow).animate({'opacity':1},300);
		$dotSpan.eq(iNow).css({'background':'#ccc'}).siblings().css({'background':'#fff'});
	})
	$arrowRight.click(function(){
		setiNow();
	})
	$dotSpan.click(function(){
		for(var i=0;i<$banImg.length;i++){
			$banImg.eq(i).animate({'opacity':0},300);
		}
		$banImg.eq($(this).index()).animate({'opacity':1},300);
		$dotSpan.eq($(this).index()).css({'background':'#ccc'}).siblings().css({'background':'#fff'});
	})
	//医叮介绍
	var $suggest=$('#suggest');
	var $appImg=$('#appDown img');
	var $appBtn=$('#appDown a');
	$suggest.hover(function(){
		$appImg.stop().animate({'margin-top':124},200,function(){
			$appBtn.stop().animate({'opacity':1},200);
		})
		
	},function(){
		$appImg.stop().animate({'margin-top':224},200,function(){
			$appBtn.stop().animate({'opacity':0},200);
		});
		
	})
	//版本下载区域动画图片  
	/*var arrBg=['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png'];
	var i=0;
	setInterval(function(){
		if(i==8){
			i=1
		}else{
			i++;
		}
		$suggest.css({'background':'url(image/animate_bg/'+i+'.png) no-repeat','background-size':'cover'});
	},200)*/
	
	//产品动画
	var $proTop=$('#proTop');
	var $proBottom=$('#proBottom');
	var $maskTop=$('#maskTop');
	var $maskBottm=$('#maskBottom');
	$proTop.hover(function(){
		$maskTop.stop().animate({'opacity':1},300,function(){
			$('#maskTop h3').stop().animate({'opacity':1,'bottom':'200px'},300);
			$('#maskTop p').stop().animate({'opacity':1,'bottom':'100px'},300);
			$('#maskTop a').stop().animate({'opacity':1,'bottom':'50px'},300);
		});
	},function(){
		$maskTop.stop().animate({'opacity':0},300);
		$('#maskTop h3').stop().animate({'opacity':0,'bottom':'0'},300);
		$('#maskTop p').stop().animate({'opacity':0,'bottom':'0'},300);
		$('#maskTop a').stop().animate({'opacity':0,'bottom':'0'},300);
		
	})
	$maskBottm.hover(function(){
		$maskBottm.stop().animate({'opacity':1},300,function(){
			$('#maskBottom h3').animate({'opacity':1,'bottom':'200px'},300);
			$('#maskBottom p').animate({'opacity':1,'bottom':'100px'},300);
			$('#maskBottom a').animate({'opacity':1,'bottom':'50px'},300);
		});
	},function(){
		$maskBottm.stop().animate({'opacity':0},300);
		$('#maskBottom h3').animate({'opacity':0,'bottom':'0px'},300);
		$('#maskBottom p').animate({'opacity':0,'bottom':'0px'},300);
		$('#maskBottom a').animate({'opacity':0,'bottom':'0px'},300);
		
	})
	
	var $proLeft=$('#proLeft');
	var $leftText=$('#leftText');
	$proLeft.hover(function(){
		$leftText.animate({'right':60,'opacity':1},300);
	},function(){
		$leftText.animate({'right':-150,'opacity':0},300);
	})
	/*关于我们*/
	var $aboutUs=$('#aboutUs');
	var $edLife=$('#edLife');
	var $maskLeft=$('#maskLeft');
	var $maskRight=$('#maskRight');
	$aboutUs.hover(function(){
		$maskLeft.animate({'opacity':1},100,function(){
			$('#maskLeft h3').animate({'opacity':1,'left':'50%'},300);
			$('#maskLeft p').animate({'opacity':1,'left':'50%'},300);
			$('#maskLeft a').animate({'opacity':1,'left':'50%'},300);
		});
	},function(){
		$maskLeft.animate({'opacity':0},300);
		$('#maskLeft h3').animate({'opacity':0,'left':'0%'},300);
		$('#maskLeft p').animate({'opacity':0,'left':'0%'},300);
		$('#maskLeft a').animate({'opacity':0,'left':'0%'},300);
	})
	
	$edLife.hover(function(){
		$maskRight.animate({'opacity':1},100,function(){
			$('#maskRight h3').animate({'opacity':1,'left':'50%'},300);
			$('#maskRight p').animate({'opacity':1,'left':'50%'},300);
			$('#maskRight a').animate({'opacity':1,'left':'50%'},300);
		});
	},function(){
		$maskRight.animate({'opacity':0},300);
		$('#maskRight h3').animate({'opacity':0,'left':'0%'},300);
		$('#maskRight p').animate({'opacity':0,'left':'0%'},300);
		$('#maskRight a').animate({'opacity':0,'left':'0%'},300);
	})
	/*尾部*/
	var $contantWayA=$('#contantWay a');
	for(var i=0;i<$contantWayA.length;i++){
		$contantWayA.eq(i).css('background','url(image/contantway.jpg) no-repeat 0  '+(-i*80)+'px')
	}
})
