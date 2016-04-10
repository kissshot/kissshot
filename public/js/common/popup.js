/**
 * Created by koroti on 2016/4/9.
 */
define(function(require, exports, module){
    /*
     * �ļ��ϴ����캯������ʱֻ֧��ͼƬ�ϴ�
     * @param {dom} el �ϴ��������
     * @param {object} options ��ѡ����
     * @returns {object} upload �ϴ�����ʵ��
     *
     * @date 2016-04-01
     * @author kissshot
     */
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
        formTpl: '<form action="{{action}}" class="upload-form" method="post" enctype="multipart/form-data" target="up">' +
        '<input style=\"filter: alpha(opacity=0);\" class="upload-input" type="file" hidefocus name="upload" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp"/>' +
        '</form>',
        initDom: function(){
            var me = this;
            me.form = $(me.formTpl.replace('{{action}}', me.options.upUrl)).appendTo(me.$el);
            me.input = me.form.find('input');
        },
        bindEvents: function(){
            var me = this;
            me.input.change(function(){
                $('<iframe name="up" style="display: none"></iframe>').appendTo($('body')).load(function(){
                    me.iframeLoaded(this);
                });
                me.form.submit();
            });
        },
        iframeLoaded: function(iframe){
            var jsonStr = iframe.contentWindow.document.body.textContent;
            $(iframe).remove();
            try{
                jsonStr = JSON.parse(jsonStr);
                this.options.success(jsonStr);
            }catch(e){
                console.log(e);
            }
        }
    }
    module.exports = {
        init: function(el, options){
            return new popup(options, callback);
        }
    }
});