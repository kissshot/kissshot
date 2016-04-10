var mongoose = require('mongoose');
//ÎÄÕÂÄ£ÐÍ
var articleSchema = mongoose.Schema({
    title: String,
    key: {type: String, set: ifyKey, get: parseKey},
    description: String,
    content: { type: String, set: setContent , get: getContent },
    createTime: { type: Date, default: Date.now },
    cover: String,
    lastUpdate: { type: Date, default: Date.now }
});

function setContent(val){
    return val;
}
function getContent(val){
    return val;
}
function ifyKey(val){
    if (!val) return val;
    return val.split(',').join('-$$-');
}
function parseKey(val){
    if (!val) return [];
    return val.split('-$$-');
}
var Article = mongoose.model('article', articleSchema);
module.exports = Article;
