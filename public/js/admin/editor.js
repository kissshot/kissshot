define(function(require, exports, module){
	//require('umeditor');
	require('ckeditor');
	var upload = require('../common/upload');
	var modal = $('#modalTip'),
		modalContent = $('.modal-body'),
		throttle = true,
		coverUrl = '';
	CKEDITOR.replace( 'myEditor' );
	//var um = UM.getEditor('myEditor');
	upload.init('#cover', {success: function(res, inst){
		if(res.state == 'success'){
			coverUrl = res.url;
			inst.$el.after('<img src="'+coverUrl+'" width="200"/>');
		}else{
			modalContent.text('上传失败！');
			modal.modal('show');
		}
	}});
	module.exports = {
		save: function(){
			if(throttle){
				throttle = false;
				console.log(CKEDITOR.instances.myEditor.getData());
				var postData = {};
				postData.title = $('#title').val();
				postData.key = $('#key').val();
				postData.description = $('#description').val();
				postData.cover = coverUrl;
				postData.text = CKEDITOR.instances.myEditor.getData();
				console.log(postData);
				$.post('/article/add',postData,function(res){
						throttle = true;
						if(res.status == 'success'){
							modalContent.text('发布成功！');
							modal.modal('show');
						}else{
							modalContent.text(res.errorMsg);
							modal.modal('show');
						}
				});
			}
		}
	}
});