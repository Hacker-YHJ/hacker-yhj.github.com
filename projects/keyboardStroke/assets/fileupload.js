var chMap,
    keyValue;

function fileUploadHandler(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  reset();
  var fr = new FileReader();
  fr.onload = (function () {
    mapToKeyboard(this.result);
  });
  fr.readAsText(this.files[0]);
}

function mapToKeyboard(content) {
  keyValue = {};
  var l = content.length;
  for (var i = 0; i < l; ++i) {
    var code = content[i].charCodeAt();
    if (code < 127) {
      asciiToKeyboard(content[i]);
    }
    else if (chMap[content[i]]) {
      var pinyin = chMap[content[i]];
      pinyin.split('').forEach(function (l) {
        asciiToKeyboard(l);
      });
    }
  }
  showColors();
}

function asciiToKeyboard(code) {
  var code = code.charCodeAt();
  if (!keyValue[code]) keyValue[code] = 0;
  ++keyValue[code];
 }

function getChMap() {
  var r = new XMLHttpRequest();
  r.open("GET", "ch.txt", true);
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    chMap = JSON.parse(r.responseText);
  };
  r.send();
}

function showColors() {
  var range = ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'],
      targetKeyValue = [];
  for (var i = 65; i < 91; ++i) {
    targetKeyValue[i] = 0;
  }
  for (var i = 97; i < 123; ++i) {
    if (keyValue[i]) targetKeyValue[i-97+65] += keyValue[i];
    if (keyValue[i-97+65]) targetKeyValue[i-97+65] += keyValue[i-97+65];
  }
  var max = Number.MIN_VALUE, min = Number.MAX_VALUE;
  targetKeyValue.forEach( function (v) {
    if (v!=undefined) {
      max = max > v ? max : v;
      min = min < v ? min : v;
    }
  });

  var newValue = []
  for (var i = 65; i < 91; ++i) {
    newValue.push(targetKeyValue[i]);
    if (targetKeyValue[i] === 0) continue;
    var index = Math.floor((targetKeyValue[i] - min) / (max - min+1) * 7);
    var key = document.querySelector('.key.c' + i);
    key.style.background = range[index];
    key.title = targetKeyValue[i];
  }
  myChart.setOption({
    series : [{data: newValue}]
  });
}

function reset() {
  var keys = document.querySelectorAll('.key');
  var l = keys.length;
  for (var i = 0; i < l; ++i) {
    keys[i].style.background = '#EFF0F2';
    keys[i].title = '';
  }
  myChart.setOption({
    series : [{data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
  });
}

window.onload = function() {
  getChMap();
  document.getElementById('fileUploadInput').onchange = fileUploadHandler;
}

