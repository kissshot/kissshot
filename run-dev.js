#!/usr/bin/env node

var Path = require('path');
var cp = require('child_process');
var fs = require('fs');

var Chalk = require('chalk');

process.env.NODE_ENV = 'development';

var fisInstance = cp.spawn('nodemon', ['-v']);

fisInstance.stdout.on('data', function (data) {
    console.log(data)
});

fisInstance.stderr.on('data', function (data) {
    process.stderr.write(data);
});



function log(message, rwMarker) {
    var time = '[' + new Date().toTimeString().match(/\S+/)[0] + '] ';
    var leadingSpaces = Array(time.length + 1).join(' ');
    console.log(Chalk.gray(time) + (rwMarker === false ? '': Chalk.yellow('rw ')) + message.replace(/\n(?!$)/g, leadingSpaces));
}

function warn(message, rwMarker) {
    var time = '[' + new Date().toTimeString().match(/\S+/)[0] + '] ';
    var leadingSpaces = Array(time.length + 1).join(' ');
    console.error(Chalk.red(time) + (rwMarker === false ? '': Chalk.yellow('rw ')) + message.replace(/\n(?!$)/g, leadingSpaces));
}
