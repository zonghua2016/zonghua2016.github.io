$(function() {
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
	   //alert(navigator.userAgent); 
	   
	   //add a new meta node of viewport in head node
		head = document.getElementsByTagName('head');
		viewport = document.createElement('meta');
		viewport.name = 'viewport';
		viewport.content = 'target-densitydpi=device-dpi, width=' + 750 + 'px, user-scalable=no';
		head.length > 0 && head[head.length - 1].appendChild(viewport);    
	   
	}
	//页面不足一屏，铺满一屏
	$('.wrap').css('min-height',$(window).height());
	var $tel = $('.mobileLogin .mobileNum input');
	var $close = $('.mobileLogin .mobileNum .close');
	var $proLi = $('.products .proGroup .pros li');
	$tel.keyup(function(){
		if($(this).val()!=''){
			$close.show();
		}else{
			$close.hide();
		}
	})
	$close.click(function(){
		$tel.val('');
		$(this).hide();
	})
//	显示弹层
	var maskTimer;
	$proLi.click(function(){
		$('.mask').removeClass('fadeOutUp').addClass('fadeInDown').show();
		maskTimer = setTimeout(function(){
			$('.proMask').removeClass('zoomOut').addClass('zoomIn').show();
		},500);
//		一定要记得清楚定时器
//		clearInterval(maskTimer);
	})
	$('.mask').click(function(){
		$('.proMask').removeClass('zoomIn').addClass('zoomOut').hide();
		maskTimer = setTimeout(function(){
			$('.mask').removeClass('fadeInDown').addClass('fadeOutUp').hide();
		},500);
//		clearInterval(maskTimer);
	})
	//获取验证码
	$('.submit,.getMsgCode').click(function(){
		if(!$(this).hasClass('active')){
			testTel();
		}else{
			return false;
		}
	});
	$('.buyBtn').click(function(){
		$('.proMask').removeClass('zoomIn').addClass('zoomOut').hide();
		maskTimer = setTimeout(function(){
			$('.mask').removeClass('fadeInDown').addClass('fadeOutUp').hide();
		},500);
//		clearInterval(maskTimer);
		$(window).scrollTop(80);
		if(!$('.submit,.getMsgCode').hasClass('active')){
			testTel();
		}else{
			return false;
		}
	})
});
function testTel(){
	var $tel = $('.mobileLogin .mobileNum input');
	var re = /^0?1[3|4|5|8][0-9]\d{8}$/;
	console.log(!re.test($tel.val()))
	if(!$tel.val()||!re.test($tel.val())){
			$('.telErr').show();
			setTimeout(function(){
				$('.telErr').hide();
			},2000);
		}else{
			var i = 60;
			var getCodeTimer;
			getCodeTimer = setInterval(function(){
				i--;
				if(i>=1){
					$('.getMsgCode').addClass('active').text(i+'秒后重发');
				}else{
					clearInterval(getCodeTimer);
					$('.getMsgCode').removeClass('active').text('获取验证码');
				}
			},1000);
//			clearInterval(getCodeTimer);
		}
}



