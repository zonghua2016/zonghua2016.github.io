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
	var maskTimer;
	$proLi.click(function(){
		$('.mask').removeClass('fadeOutUp').addClass('fadeInDown').show();
		maskTimer = setTimeout(function(){
			$('.proMask').removeClass('zoomOut').addClass('zoomIn').show();
		},500);
	})
	$('.mask').click(function(){
		$('.proMask').removeClass('zoomIn').addClass('zoomOut').hide();
		maskTimer = setTimeout(function(){
			$('.mask').removeClass('fadeInDown').addClass('fadeOutUp').hide();
		},500);
	})
	
	
});





