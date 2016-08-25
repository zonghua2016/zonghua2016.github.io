// JavaScript Document
$(function(){
	var $box=$('#box');
	var timer;
	var img=1;
	var $oh=$('.oh');
	var $th=$('.th');
	var $ov=$('.ov');
	var $tv=$('.tv');
	$oh.animate({'width':'100%'},1000,function(){
		$ov.animate({'height':'560px'},1000);
		$tv.animate({'height':'560px'},1000);
		});
	$th.animate({'width':'100%'},1000);
	$('#box').animate({'opacity':1},1000);
	bgRun();
	function bgRun(){
		timer=setInterval(function(){
		if(img==1){
			$box.css({'background':'url(images/bg2.jpg) no-repeat','background-size':'1086px 560px','opacity':0.5});
			$('#box').animate({'opacity':1},1000);
			img++;
			}else{
				$box.css({'background':'url(images/bg1.jpg) no-repeat','background-size':'1086px 560px','opacity':0.5});
				$('#box').animate({'opacity':1},1000);
				img=1;
				}
		},3000);
		}
	
	$('.smaImg').hover(function(){
		clearInterval(timer);
		},function(){
			bgRun();
			});
	$('.br').find('li img').hover(function(){
		$('.mask').stop().animate({'opacity':1},1000);
		},function(){
			$('.mask').stop().animate({'opacity':0},1000);
			});
	/*也能实现mask的显示隐藏
	$('.br').find('li img').hover(function(){
		$('.mask').stop().fadeToggle(1000);
		});*/
	});