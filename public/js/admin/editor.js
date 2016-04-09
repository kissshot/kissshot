define(function(require, exports, module){
	//require('umeditor');
	require('ckeditor');
	var upload = require('../common/upload');
	var modal = $('#modalTip'),
		modalContent = $('.modal-body'),
		throttle = true;
	CKEDITOR.replace( 'myEditor' );
	//var um = UM.getEditor('myEditor');
	upload.init('#cover', {success: function(res){
		console.log(res);
	}});
	module.exports = {
		save: function(){
			if(throttle){
				throttle = false;
				console.log(CKEDITOR.instances.myEditor.getData());
				var postData = {};
				postData.title = $('#title').val();
				postData.key = $('#key').val();
				postData.text = CKEDITOR.instances.myEditor.getData();
				console.log(postData);
				$.post({
					url: '/article/add',
					data: postData,
					success: function(res){
						throttle = true;
						if(res.status == 'success'){
							modalContent.text('发布成功！');
							modal.modal('show');
						}else{
							modalContent.text(res.errorMsg);
							modal.modal('show');
						}
					},
					error: function(){

					}
				});
			}
		}
	}
});