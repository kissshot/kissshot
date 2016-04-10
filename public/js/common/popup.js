/**
 * Created by koroti on 2016/4/9.
 */
define(function(require, exports, module){
    module.exports = {
        popupDom: {
            alter : '<div id="alter" class="modal-dialog">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header"><h4 class="modal-title"><%=title=%></h4></div>'+
                            '<div class="modal-body"><%=content=%></div>'+
                            '<div class="modal-footer"> <button type="button" class="btn btn-primary"><%=sureBtn=%></button></div>'+
                        '</div> '+
                    '</div>',
            load : '<div id="load" class="modal-dialog modal-sm">'+
                        '<div class="modal-content">'+
                            '<div class="modal-body"><%=content=%></div>'+
                        '</div> '+
                    '</div>',
            confirm : '<div id="confirm" class="modal-dialog">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header"><h4 class="modal-title"><%=title=%></h4></div>'+
                            '<div class="modal-body"><%=content=%></div>'+
                            '<div class="modal-footer"><button type="button" class="btn btn-default"><%=cancelBtn=%></button><button type="button" class="btn btn-primary"><%=sureBtn=%></button></div>'+
                        '</div> '+
                    '</div>'
        },
        alter: function(options, callback, scope){
            options = options || '';
            if(typeof options == 'string'){
                options = {content:options}
            }
            this.show($.extend({type: 'alter'},options), callback, scope);
        },
        load: function(options, callback, scope){
            options = options || '';
            if(typeof options == 'string'){
                options = {content:options}
            }
            this.show($.extend({type: 'load'},options), callback, scope);
        },
        confirm: function(options, callback, scope){
            options = options || '';
            if(typeof options == 'string'){
                options = {content:options}
            }
            this.show($.extend({type: 'confirm'},options), callback, scope);
        },
        defaults: {
            alter: {
                sureBtn: '确定',
                title: '提示'
            },
            load: {

            },
            confirm: {
                sureBtn: '确定',
                cancelBtn: '取消',
                title : '提示'
            }
        },
        show: function(options, callback, scope){
            var me = this;
            var type = options.type;
            var options = $.extend({}, this.defaults[type], options);
            var $popup = $('#'+type);
            var popupDom = this.popupDom[type];
            if($popup.length){
                $.each(options, function(k, v){
                    switch(k){
                        case 'title':
                            $popup.find('.modal-title').html(v);
                            break;
                        case 'content':
                            $popup.find('.modal-body').html(v);
                            break;
                        case 'sureBtn':
                            $popup.find('.btn-primary').html(v);
                            break;
                        case 'cancelBtn':
                            $popup.find('.btn-default').html(v);
                            break;
                    }
                });
            }else{
                $.each(options, function(k, v){
                    switch(k){
                        case 'title':
                            popupDom = popupDom.replace('<%=title=%>', v);
                            break;
                        case 'content':
                            popupDom = popupDom.replace('<%=content=%>', v);
                            break;
                        case 'sureBtn':
                            popupDom = popupDom.replace('<%=sureBtn=%>', v);
                            break;
                        case 'cancelBtn':
                            popupDom = popupDom.replace('<%=cancelBtn=%>', v);
                            break;
                    }
                });
                $popup = $(popupDom).appendTo('body');
            }
            this['$'+type] = $popup.show().find('.modal-footer').one('click','button',function(e){
                if($(this).hasClass('btn-primary')){
                    callback && callback(true);
                }else{
                    callback && callback(false);
                }
                $popup.hide();
            });
        },
        loadHide: function(){
            if(this['$load']){
                this['$load'].hide();
            }
        }
    };
});