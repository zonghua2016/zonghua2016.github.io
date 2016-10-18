
$(function(){
//	登陆框弹出
	var $whole=$('.whole');
	$whole.animate({'right':0},1000);
	
	var $login=$('.login').eq(0);
	var smPic=[];
	//定时器 
	var smailTimer=setInterval(function(){
		//产生随机位置
		var numLeft=Math.round(Math.random()*50);
		var numTop=Math.round(Math.random()*200+200);
		
		//创建一个img元素
		var $loginImg=$('<img/>');
		$loginImg.attr({'src':'./images/smailpic.png'}).css({'left':numLeft+'%','top':numTop+'px'}).appendTo($login);
//		$login.append($loginImg);
		smPic.push($loginImg);

//	var loginImg=document.createElement('img');
//		loginImg.style.left=numLeft+'%';
//		loginImg.style.top=numTop+'px';
//		loginImg.style.src='./images/smailpic.png';
//		loginImg.style.opacity=1;
//		$login.appendChild(loginImg);
//		
//		smPic.push(loginImg);
		//不断循环删除新增加的img元素
		for(var i=0;i<smPic.length;i++){
			if(smPic[i].css('opacity')=='0'){
				smPic[i].remove();
			}
		}
				
	},1000); 
	
//	登陆效果
	var $clearInput=$('.login_close_img');
		var $oInput=$('.input');
		$clearInput.eq(0).click(function(){
			$oInput.eq(0).val('');
		});
		$clearInput.eq(1).click(function(){
			$oInput.eq(1).val('');
		});
		
//		$clearInput.click(function(){
//			$oInput.eq($(this).index()).val('');
//		});
		$clearInput.hover(function(){
			$(this).attr('src','images/login_close_hover.png');
		},function(){
			$(this).attr('src','images/login_close.png');
		});
});