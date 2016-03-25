requirejs.config({
    baseUrl: 'js/',
    //当模块id前缀为app时，他便由js/app加载模块文件
    //这里设置的路径是相对与baseUrl的，不要包含.js
    paths: {
    	"jquery": "/vendor/jquery/jquery-2.0.2.min",
    	"bootstrap": "/vendor/bootstrap/bootstrap.min"
    },
    shim: {"bootstrap": {
    	deps: ['jquery'],
    	exports: 'bootstrap'
    }},
    debug: true
});

requirejs(['jquery', 'bootstrap'], function($, bs){
	var modal = $('#modalTip'),
		modalContent = $('.modal-body'),
		throttle = true;
	$('.form-signin').submit(function(e){
		if(throttle){
			throttle = false;
			var userData = {};
	        userData.account = $('#inputAccount').val().trim();
	        userData.password = $('#inputPassword').val().trim();
	        $.post('/admin/auth', userData, function(res){
	        	throttle = true;
	        	if(res.status == 'success'){
	        		location.href = '/admin';
	        	}else{
	        		modalContent.text(res.errorMsg);
	        		modal.modal('show');
	        	}
	        });
		}
        
        e.preventDefault();
    });
})