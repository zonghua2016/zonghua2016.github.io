$(function() {
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





