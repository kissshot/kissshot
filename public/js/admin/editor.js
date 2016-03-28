define(function(require, exports, module){
	require('umeditor');
	var um = UM.getEditor('myEditor');
	module.exports = {
		save: function(){
			$.post('/article/add', {text: um.getContent()},function(res){
				console.log(res)
			});
		}
	}
});