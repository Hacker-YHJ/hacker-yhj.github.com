var getContext;
var bgcanvas=document.createElement('canvas').getContext('2d');
var img=new Image();
var defaultpic='cofe.jpg'
var getImage;
var picH=512;
var picW=512;
var pixelPerCircle=4;

function gonload() {
  cnt = document.getElementById('preview');
  if (window.FileReader) {
      cnt.addEventListener('dragover', handleDragOver, false);
      cnt.addEventListener('drop', handleFileSelect, false);
    } else {
      document.getElementById('dragbox').innerHTML = "Your browser doesn't support drag and drop.";
  }

  setDefaultPic();
}

function isImage(type) {
  switch (type) {
  case 'image/jpeg':
  case 'image/png':
  case 'image/gif':
  case 'image/bmp':
  case 'image/jpg':
    return true;
  default:
    return false;
  }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files;
  var t = files[0].type ? files[0].type : 'n/a';
  if (isImage(t)) {
    var fr = new FileReader();
    fr.onload = (function () {
      img.onload = (function() {
        bgcanvas.drawImage(img, 0, 0, picH/pixelPerCircle, picW/pixelPerCircle);
        getImage=bgcanvas.getImageData(0, 0, picH/pixelPerCircle, picW/pixelPerCircle).data;
        document.getElementById('preview').src=img.src;
        makeCircles(getImage);
      });
      img.src=this.result;
    });
    fr.readAsDataURL(files[0]);
  }
  else {
    alert('A picture please~~');
  }
}

function setDefaultPic() {
  img.onload = (function() {
    document.querySelector("#loadingImg").remove()
    bgcanvas.drawImage(img, 0, 0, picH/pixelPerCircle, picW/pixelPerCircle);
    getImage=bgcanvas.getImageData(0, 0, picH/pixelPerCircle, picW/pixelPerCircle).data;
    document.getElementById('preview').src=img.src;
    makeCircles(getImage);
  });
  img.src=defaultpic;
}
window.onload = gonload;