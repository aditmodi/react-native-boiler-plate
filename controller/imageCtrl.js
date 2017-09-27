const ImageDB = require('../models/images');
const fs = require('fs');
var cloudinary = require('cloudinary');

exports.addImages = function(req, res){
  console.log("It comes here: ..... ", req.body.email);
  var newImg = new ImageDB();
  cloudinary.uploader.upload(
     `data:image/jpg;base64,${req.body.data}`,
    // req.body.photo,
    function(result){
    console.log("this is the url:", result);
    newImg.email = req.body.email;
    newImg.img.url = result.secure_url;
    newImg.date = new Date();
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
  console.log("BODY EMAIL: ", req.params.email);
  ImageDB.find({email: req.params.email}).sort({date: -1}).exec(function(err, imageUrl) {
    console.log("IMAGE URL:::", imageUrl);
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
