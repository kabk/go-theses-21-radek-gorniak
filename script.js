onload = function() {
    var randomElm = function() {
        for(var i = Math.floor(Math.random() * elements.length); locArr[i];) {
            i = Math.floor(Math.random() * elements.length);
        }
        locArr[i] = true;
        fadeInTextShadow(elements[i], i);
        setTimeout(function() { randomElm(); }, 2000);
    },
    fadeInTextShadow = function(elm, n) {
        var tShadow = document.defaultView.getComputedStyle(elm).textShadow;
        if(tShadow && tShadow.match(/rgba?\(([0-9\.%]+)\s*,\s*([0-9\.%]+)\s*,\s*([0-9\.%]+)(\s*,\s*[0-9\.]+)?\)/)) {
            var r = RegExp.$1, g = RegExp.$2, b = RegExp.$3, a = RegExp.$4 ? RegExp.$4.replace(/^\s*,\s*/, '') * 1 + 0.05 : 0.05, rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + (a < 1 ? a : 1) + ')';
            elm.style.textShadow = tShadow.replace(/rgba?\(.+?\)/, rgba);
            a < 1 ? setTimeout(function() { fadeInTextShadow(elm, n) }, 100) : (a >= 1 && setTimeout(function() { fadeOutTextShadow(elm, n) }, 3000));
        }
    },
    fadeOutTextShadow = function(elm, n) {
        var tShadow = document.defaultView.getComputedStyle(elm).textShadow;
        if(tShadow && tShadow.match(/rgba?\(([0-9\.%]+)\s*,\s*([0-9\.%]+)\s*,\s*([0-9\.%]+)(\s*,\s*[0-9\.]+)?\)/)) {
            var r = RegExp.$1, g = RegExp.$2, b = RegExp.$3, a = RegExp.$4 ? RegExp.$4.replace(/^\s*,\s*/, '') * 1 - 0.05 : 0.95, rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + (a > 0.05 ? a : 0.05) + ')';
            elm.style.textShadow = tShadow.replace(/rgba?\(.+?\)/, rgba);
            a > 0.05 ? setTimeout(function() { fadeOutTextShadow(elm, n) }, 100) : locArr[n] = false;
        }
    },
    elements = document.querySelectorAll('#top p'),
    locArr = [];
    for(var i = 0, l = elements.length; i < l; i++) {
        locArr[locArr.length] = false;
    }
    randomElm();
}
