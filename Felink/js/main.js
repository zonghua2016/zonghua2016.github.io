// JavaScript Document

$(function(){
		var $bgImg=$('.banner-box-zm');
		$bgImg.each(function(i, elem) {
           $bgImg.eq(i).css('background-image','url("image/bg'+(i+1)+'.jpg")'); 
        });
		
		var $dropdown=$('.dropdown').eq(0);
		var $dropMenu=$('#dropMenu');
		$dropdown.hover(function(){
			$dropdown.toggleClass('open');
			$dropMenu.stop().animate({'height':230},300);
			},function(){
				$dropdown.toggleClass('open');
				$dropMenu.stop().animate({'height':0},300);
				});
		var $navbar=$('#navbar');
		$(window).scroll(function(ev){
			if($(document).scrollTop()>80){
				$navbar.addClass('navbar-fixed-top');
				}else{
					$navbar.removeClass('navbar-fixed-top');
					}
			
			});
		//背景图 logo初始化
		var $captionH3=$('.carousel-caption h3');
		$captionH3.each(function(i, element) {
            $captionH3.eq(i).css({'background':'url(image/'+i+'_logo.png) no-repeat center center'});
        });
		
		//弹出二维码
		var $downloadapp=$('.downloadapp .ewm');
    var $form_modal = $('.cd-user-modal'), 
    $form_login = $form_modal.find('#cd-login'), 
    $form_signup = $form_modal.find('#cd-signup'), 
    $form_modal_tab = $('.cd-switcher'), 
    $tab_login = $form_modal_tab.children('li').eq(0).children('a'), 
    $tab_signup = $form_modal_tab.children('li').eq(1).children('a'), 
    $main_nav = $('.main_nav'); 
  
  //弹出窗口 
  $downloadapp.on('click', function(event){ 
  
    if( $(event.target).is($main_nav) ) { 
      // on mobile open the submenu 
      $(this).children('ul').toggleClass('is-visible'); 
    } else { 
      // on mobile close submenu 
      $main_nav.children('ul').removeClass('is-visible'); 
      //show modal layer 
      $form_modal.addClass('is-visible');   
      //show the selected form 
      ( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected(); 
    } 
  
  }); 
  
  //关闭弹出窗口 
  $('.cd-user-modal').on('click', function(event){ 
    if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) { 
      $form_modal.removeClass('is-visible'); 
    }   
  }); 
  //使用Esc键关闭弹出窗口 
  $(document).keyup(function(event){ 
    if(event.which=='27'){ 
      $form_modal.removeClass('is-visible'); 
    } 
  }); 
  
  
  function login_selected(){ 
    $form_login.addClass('is-selected'); 
    $form_signup.removeClass('is-selected');  
    $tab_login.addClass('selected'); 
    $tab_signup.removeClass('selected'); 
  } 
		
	});