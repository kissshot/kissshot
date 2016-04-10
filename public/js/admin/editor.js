define(function(require, exports, module){
	//require('umeditor');
	require('ckeditor');
	var popup = require('popup');
	var upload = require('../common/upload');
	var throttle = true,
		coverUrl = '';
	CKEDITOR.replace( 'myEditor' );
	//var um = UM.getEditor('myEditor');
	upload.init('#cover', {size: 600, success: function(res){
		if(res.state == 'success'){
			coverUrl = res.url;
		}else{
			popup.alter('上传失败');
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
							popup.alter('发布成功');
						}else{
							popup.alter(res.errorMsg);
						}
				});
			}
		}
	}
});