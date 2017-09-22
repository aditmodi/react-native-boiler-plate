const ImageDB = require('../models/images');
const fs = require('fs');
var cloudinary = require('cloudinary');


exports.addImages = function(req, res){
  // console.log("It comes here: ..... ", req.body);
  cloudinary.uploader.upload(
     `data:image/jpg;base64,${req.body.data}`,
    // req.body.photo,
    function(result){
    console.log("this is the url:", result);
    var newImg = new ImageDB();
    newImg.img.url = result.secure_url;
    newImg.save(function(err){
      if(err){
        return res.send(err);
      }
      res.json({
        status: 'ok',
        message: 'Picture saved'
      })
    })
  })
}

exports.getImages = function(req, res) {
  ImageDB.find(function(err, imageUrl) {
    if (err)
      res.send(err);

    // res.json({
    //   data : image
    // });
    res.json({
      'status': 'ok',
      'data': imageUrl
    })
  });
}
