define(function(require, exports, module){
    var popup = require('popup');
    function upload(el, options){
        var defaults = {
            upUrl: "/resource/img/upload"
        };
        this.$el = $(el);
        this.options = $.extend({}, defaults, options);
        this.initDom();
        this.bindEvents();
        return this;
    }
    upload.prototype = {
        construtor: upload,
        formTpl: '<input style=\"filter: alpha(opacity=0);\" class="upload-input" type="file" hidefocus name="upload" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp"/>',
        initDom: function(){
            var me = this;
            me.upinput = $(me.formTpl).appendTo(me.$el);
        },
        bindEvents: function(){
            var me = this;
            me.upinput.change(function(){
                var fileInput = this;
                me.drawCanvasImage(fileInput.files[0], me.options.size).then(function(arr){
                    popup.confirm({title: '预览', content: '<img src="'+arr[0]+'"/>'}, function(flag){
                        if(flag){
                            var fd = new FormData();
                            fd.append('upload', arr[1], fileInput.files[0].name);
                            $.ajax({
                                url: me.options.upUrl,
                                type: 'POST',
                                data: fd,
                                processData : false,
                                /**
                                 *必须false才会自动加上正确的Content-Type
                                 */
                                contentType : false,
                                success: function(res){
                                    me.options.success(res);
                                }
                            })
                            //$('<iframe name="up" style="display: none"></iframe>').appendTo($('body')).load(function(){
                            //    me.iframeLoaded(this);
                            //});
                            //me.form.submit();
                        }else{

                        }
                    });
                });
            });
        },
        //iframeLoaded: function(iframe){
        //    var jsonStr = iframe.contentWindow.document.body.textContent;
        //    $(iframe).remove();
        //    try{
        //        jsonStr = JSON.parse(jsonStr);
        //        this.options.success(jsonStr, this);
        //    }catch(e){
        //        console.log(e);
        //    }
        //},
        drawCanvasImage: function(file, width){
            var me = this;
            return new Promise(function(resovle, reject){
                var canvas = document.createElement('canvas'),
                    context = canvas.getContext('2d');

                var img = new Image();
                img.onload = function(){
                    if(width){
                        if(width > img.width){
                            var target_w = img.width;
                            var target_h = img.height;
                        }else{
                            var target_w = width;
                            var target_h = parseInt(target_w/img.width*img.height);
                        }
                    }else{
                        var target_w = img.width;
                        var target_h = img.height;
                    }
                    canvas.width = target_w;
                    canvas.height = target_h;

                    context.drawImage(img,0,0,target_w,target_h);

                    _canvas = canvas.toDataURL();
                    /*console.log(_canvas);*/
                    resovle([_canvas, me.dataURLtoBlob(_canvas)]);
                }
                img.src = window.URL.createObjectURL(file);;
            });
        },
        dataURLtoBlob: function(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        }
}
    module.exports = {
        init: function(el, options){
            return new upload(el, options);
        }
    }
});