// JavaScript Document
$(function(){
	 //展示图片跟随鼠标移动 凤凰新媒体介绍|投资者关系 Investor Relations|广告服务||||| 
	 var boff=true;
	 var icu=0;
	 var arrImg=['q1.jpg','q2.jpg','q3.jpg','q4.jpg'];
	 //鼠标移动到大图上的效果
	$('#showimg').hover(function(ev){
		$('#upimg').css({'left':0});
		$('#downimg').css({'top':0});
		  var oldX=ev.pageX;
		  var oldY=ev.pageY;
		$(document).mousemove(function(ev){
			  var newX=ev.pageX;
			  var newY=ev.pageY;
			  if(newX>oldX){
				  icu+=2;
				  if(icu>20){
					  icu=20
					  }
				  }else{
					  icu-=2;
					  if(icu<-20){
						  icu=-20;
						  }
					  }
				$('#upimg').css('left',icu);
				oldX=newX;
				if(newY>oldY){
				  icu+=2;
				  if(icu>20){
					  icu=20;
					  }
				  }else{
					  icu-=2;
					  if(icu<-20){
						  icu=-20;
						  }
					  }
				$('#downimg').css({'top':icu});
				oldY=newY;
		   });
		},function(){
			$('#upimg').css({'left':0});
			$('#downimg').css({'top':0});
			$(document).unbind('mousemove');
			});
		$oLi=$('#product ul li');
		$oImg=$('#product ul li img');
		//初始化产品图片
		for(var i=0;i<$oImg.length;i++){
			$oImg.eq(i).attr('src','images/'+arrImg[i]);
			}
		//产品亮点
		$oLi.hover(function(){
			$(this).css({'z-index':10,'opacity':1,'transform':'scale(1.1)','border':'1px solid #ccc','border-radius':'8px','box-shadow':'0 0 5px 10px rgba(0,0,0,.1)'}).siblings().css({'z-index':1,'opacity':0.4,'transform':'scale(1)','border':'none'});
			},function(){
				$oLi.css({'z-index':1,'opacity':1,'transform':'scale(1)','border':'none','box-shadow':'0 0 5px 10px rgba(0,0,0,0)'});
				});
			//二维码
			$('#ewm img').hover(function(){
				$(this).css({'width':276,'height':376}).attr('src','images/erweima_l.jpg');
				},function(){
					$(this).css({'width':112,'height':112}).attr('src','images/smlerweima.png');
					});
		//点击导航条显示隐藏的红色条
		$('#bar li').click(function(){
			if(!$(this).attr('cur')){
				$('#bar li').attr('cur','');
				$('#closelay').css('height',120);
				$('#closelay ul').animate({'left':-1350*$(this).index()},200);
				$('#body').animate({'top':120},300);
				$('#bar li span').css('background','url(images/down_d.jpg) no-repeat');
				$('#bar li span').eq($(this).index()).css('background','url(images/down_d_cur.jpg) no-repeat');
				$(this).attr('cur','cur');
				}else{
					$(this).attr('cur','');
					$('#closelay').css('height',0);
					$('#body').animate({'top':0},300);
					$('#bar li span').eq($(this).index()).css('background','url(images/down_d.jpg) no-repeat');
					}
			});
	 });