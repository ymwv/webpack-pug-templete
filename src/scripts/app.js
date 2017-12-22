require('../styles/app.scss');
var _ = require('lodash');
var $ = require('./plugins/jquery.1.24.min.js')
$(function () {
    $.each([1,2,3],function (i,item) {
        console.log(i);
    })
   console.log('jquery');
});


var btn = document.getElementById('music_btn');

btn.addEventListener('click', clickHandler, false);

function clickHandler(e) {
    
    var isinclude = _.includes([1, 2, 3], 1);

    console.log('click : ' + isinclude);
}

console.log('Welcome frome app.js');
var aaa = 'dddddd';


