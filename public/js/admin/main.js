requirejs.config({
  baseUrl: '/js/admin/',
  paths: {
    "jquery": "/vendor/jquery/jquery-2.0.2.min",
    "bootstrap": "/vendor/bootstrap/js/bootstrap.min",
    'md5': "/vendor/crypto/md5",
    'umeditor-config': "/vendor/umeditor/umeditor.config",
    'umeditor': "/vendor/umeditor/umeditor"
  },
  shim: {
    "bootstrap": {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    "umeditor": {
      deps: ['umeditor-config'],
      exports: 'umeditor'
    }
  },
  debug: true
});
window.UMEDITOR_HOME_URL = '/vendor/umeditor/';
requirejs(['jquery', 'bootstrap', 'md5', 'editor'], function($, bs, hash, editor){
  $('#save').click(function(){
    editor.save();
  })
});