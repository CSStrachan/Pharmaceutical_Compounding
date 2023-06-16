/**
 * File Name: camera.js
 *
 * Revision History:
 *       Chad Strachan, 2023-04-15 : Created
 */

function capturePhoto () {
  var options = {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true
  };

  function onSuccess(imageData) {
    var image= $("#imgSnap");
    image.prop("src", "data:image/jpeg;base64," + imageData);
  }

  function onFail(error) {
    alert("Failure because:" + error.message);
  }
  navigator.camera.getPicture(onSuccess, onFail, options);
}

function loadFromPhotoLibrary() {
  var options = {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
  }

  function onSuccess(imageData) {
    var image = $("#imgSnap");
    image.prop("src", "data:image/jpeg;base64" + imageData);
  }
  function onFail(error) {
    alert("Failed because : "+ error.message);
  }

  navigator.getPicture(onSuccess, onFail, options);
}
