// JavaScript Document
$(function(){
    var $navLi=$('.nav li');
	var $spanLine=$('#line');
	var $bgd=$('#bgd');
	var $bgimg=$('.bgimg img');
	var arrbgImg=['bg1-1.png','bg1-2.png','bg1-3.png','bg2-1.png','bg2-2.png','bg2-3.png','bg3-1.png','bg3-2.png','bg3-3.png','bg4-1.png','bg4-2.png','bg4-3.png'];
	var arrbgxiaImg=['TB13.jpg','TB1J.jpg','TB1.jpg','TB1i5.jpg','TB1I.jpg'];
	var arrColor=['#E2E2E2','#EBEBEB','#E2E2E2','#EBEBEB','#E2E2E2'];
	var $bgLi=$('#bglist li');
	var $bgText=$('.bgtext');
	var $bgImg=$('.bgimg');
	var $bgSpan=$('#whiteblock span');
	var timer;
	var bgNum=0;
	var $oneLi=$('.oneLi');
	var $oneSpan=$('.oneSpan');
	var $img=$('.img');
	var $proLi=$('#proLis>li');
	var $proHead=$('.proHead');
	var $proImg=$('.proHead img');
	var $proFoot=$('.proFoot');
	var $hideContent=$('.hideContent');
	var $proHeadh3=$('.proHead h3');
	var $proHeadspan=$('.proHead span');
	//导航条滑动效果
    for(var i=0;i<$navLi.length;i++){
		$navLi.eq(i).hover(function(){
			$spanLine.css({'display':'block'}).stop().animate({'width':$(this).innerWidth(),'left':$(this).position().left},300);
			},function(){
					$spanLine.stop().animate({'width':0,'left':$(this).position().left},300).css({'display':'block'});
				});
		}
		//初始化展示大图
		for(var i=0;i<$bgimg.length;i++){
			$bgimg.eq(i).attr('src','img/'+arrbgImg[i]);
			}
		//初始化背景图下
		for(var i=0;i<$img.length;i++){
			$oneLi.eq(i).css('background',arrColor[i]);
			$img.eq(i).css('background','url(img/'+arrbgxiaImg[i]+') no-repeat');
			}
		//展示页图片滚动
		
		setBg(0);
		bgRoll();
		function setBg(num){
			$bgLi.eq(num).css('display','block').siblings().css('display','none');
			for(var i=0;i<$bgText.length;i++){
				$bgText.eq(i).css({'top':180,'opacity':0});
				}
			$bgText.eq(num).animate({'top':150,'opacity':1},300);
			for(var i=0;i<$bgImg.length;i++){
				$bgImg.css({'top':30,'opacity':0});
				}
			$bgImg.eq(num).animate({'top':0,'opacity':1},300);
			$bgSpan.eq(num).css('background-color','rgba(255,255,255,1)').siblings().css('background-color','rgba(255,255,255,0.5)');
			}
		function bgRoll(){
				timer=setInterval(function(){
					if(bgNum==3){
						bgNum=0;
						}else{
							bgNum++;
							}
					setBg(bgNum);
				},2000);	
			}
		$bgd.hover(function(){
			clearInterval(timer);
			},function(){
				bgRoll();
				});
		//$bgSpan的点击事件
		$bgSpan.click(function(){
				    setBg($(this).index());
					bgNum=$(this).index();
			});
		
		//----------------------------------
	//背景图下
	$oneLi.each(function(i, elem) {
		var oneLiTimer;
		var j=0;
        $oneLi.eq(i).hover(function(){
			$oneSpan.eq(i).css('color','#00C1DE');
			clearInterval(oneLiTimer);
			oneLiTimer=setInterval(function(){
				if(j<=-19000){
					clearInterval(oneLiTimer);
					}else{
						j-=350;
						$img.eq(i).css('background-position','0px '+j+'px');
						}
				},30);
			},function(){
				$oneSpan.eq(i).css('color','#000');
				clearInterval(oneLiTimer);
				oneLiTimer=setInterval(function(){
					if(j>=0){
						clearInterval(oneLiTimer);
						}else{
							j+=350;
							$img.eq(i).css('background-position','0px '+j+'px');
							}
					},30);
				});
    });
	
	//产品说明
	setOne(0);
	
	for(var i=0;i<$proLi.length;i++){
		$proLi.eq(i).hover(function(){
			setOne($(this).index());
			});
		}
	function setOne(num){
		  for(var j=0;j<$proFoot.length;j++){
				$proFoot.eq(j).css('display','block');
				$hideContent.eq(j).css('display','none');
				$proHead.eq(j).css({'width':260,'height':172,'margin-top':0,'background-color':'#EBEBEB'});
				$proImg.eq(j).attr('src','img/pro'+(j+1)+'-1.png');
				$proHeadh3.eq(j).css('color','#000');
				$proHeadspan.eq(j).css('color','#000');
				}
			$proLi.eq(num).css({'width':402,'height':570,'top':-53,'border':'1px solid #00C1DE','box-shadow':'0 0 5px 10px rgba(0,193,222,.1)','z-index':10}).siblings().css({'width':260,'border':'1px solid #ccc','box-shadow':'0 0 0 0','z-index':1,'height':550,'top':0});
			$proHeadh3.eq(num).css('color','white');
			$proHeadspan.eq(num).css('color','white');
			$proImg.eq(num).attr('src','img/pro'+(num+1)+'-2.png');
			$proFoot.eq(num).css('display','none');
			$hideContent.eq(num).css({'display':'block','height':345});
			$proHead.eq(num).css({'width':402,'background-color':'#00C1DE','height':192,'margin-top':-20});
		}
	
	var $imgList=$('#imgList');
	var $imgListLi=$('#imgList li');
	var $proImgA=$('#proImg>a');
	var $mask=$('.mask');
	var $maskImg=$('.mask img');
	var $maskSpan=$('.mask span');
	var $maskH2=$('.mask h2');
	var $maskP=$('.mask p');
	var $maskA=$('.mask a');
	var proImgATimer;
	
	var rolleft=0;
	
	for(var i=0;i<$imgListLi.length;i++){
		$imgListLi.eq(i).css({'background-image':'url(img/prolist'+(i+1)+'.jpg)','background-size':'contain'});
		$maskImg.eq(i).attr({'src':'img/prolist'+(i+1)+'-1.png'});
		$imgListLi.eq(i).hover(function(){
			 setMask($(this).index());
			  },function(){
				  setoutMask($(this).index());
				  });
		}
	
	//鼠标移出里
	function setoutMask(num){
		$mask.eq(num).css({'background':'rgba(0,0,0,.7)'});
		$maskImg.eq(num).attr({'src':'img/prolist'+(num+1)+'-1.png'}).stop().animate({'margin-top':50},300);
		$maskSpan.eq(num).css({'display':'block'});
		$maskH2.eq(num).stop().animate({'top':200},300);
		$maskP.eq(num).stop().animate({'display':'none','bottom':90,'opacity':0},300);
		$maskA.eq(num).stop().animate({'display':'none','bottom':20,'opacity':0},300);
		}
		//鼠标移入li
	function setMask(num){
		$mask.eq(num).css({'background':'rgba(0,193,222,.6)'});
		$maskImg.eq(num).attr({'src':'img/prolist'+(num+1)+'-2.png'}).stop().animate({'margin-top':20},300);
		$maskSpan.eq(num).css({'display':'none'});
		$maskH2.eq(num).stop().animate({'top':150},300);
		$maskP.eq(num).stop().animate({'display':'block','bottom':140,'opacity':1},300);
		$maskA.eq(num).stop().animate({'display':'block','bottom':80,'opacity':1},300);
		}
		$imgList.hover(function(){
				$proImgA.stop().animate({'opacity':1},300);
			},function(){
				$proImgA.css({'opacity':0});
				});
		$proImgA.hover(function(){
				clearInterval(proImgATimer);
				$proImgA.css({'opacity':1});
			},function(){
				proImgATimer=setTimeout(function(){
					$proImgA.css({'opacity':0});
					},300);
				});
	
	$proImgA.eq(0).click(function(){
		///$imgList.css('animation','move 5s linear infinite');
		if(rolleft==0){
			rolleft=-1350;
			}else{
				rolleft+=1350;
				}
		$imgList.animate({'left':rolleft},300);
		});
	$proImgA.eq(1).click(function(){
		if(rolleft==-1350){
			rolleft=0;
			}else{
				rolleft-=1350;
				}
		$imgList.animate({'left':rolleft},300);
		});
	
	var $proTransListA=$('.proTransList>a');
	$proTransListA.each(function(i, elem) {
		$proTransListA.eq(i).css('background-image','url(img/tbs'+(i+1)+'.jpg)');
        var proTransTimer;
		var j=0;
		$proTransListA.eq(i).hover(function(){
			clearInterval(proTransTimer);
			 proTransTimer=setInterval(function(){
				 if(j<=-8000){
					 clearInterval(proTransTimer);
					 }else{
						 j-=150;
						 $proTransListA.eq(i).css('background-position','0px '+(j)+'px');
						 }
			 },20);
				},function(){
					clearInterval(proTransTimer);
					proTransTimer=setInterval(function(){
					 if(j>=0){
						 clearInterval(proTransTimer);
						 }else{
							 j+=150;
							$proTransListA.eq(i).css('background-position','0px '+(j)+'px');
							 }
				 },20);
			});
    });
	
	
	var $shequList=$('.shequList');
	var $shequLi=$('.shequLi');
	var $shequLiImg=$('.shequLi img');
	
	$shequList.each(function(i, element) {
        $shequLi.eq(i).hover(function(){
				$shequLiImg.eq(i).css({'transform':'scale(1.1)'});
				$(this).css({'box-shadow':'0 0 5px 1px rgba(0,0,0,.5)'});
			},function(){
				$shequLiImg.eq(i).css({'transform':'scale(1)'});
				$(this).css({'box-shadow':'0 0 0 0 rgba(0,0,0,.5)'});
			});
   	 });
	
	var $firstA=$('#first a');
	var $lastLi=$('#lastchild li');
	var $ewmImg=$('#lastchild li img');
	for(var i=0;i<$firstA.length;i++){
		$firstA.eq(i).css({'background':'url(img/foot'+(i+1)+'.png) no-repeat','background-size':'50px 50px'});
		}
	$ewmImg.each(function(i, element) {
        $lastLi.eq(i).hover(function(){
			for(var j=0;j<$ewmImg.length;j++){
				$ewmImg.eq(j).css('display','none');
			}
			$ewmImg.eq(i).css('display','block');
			});
    });
});