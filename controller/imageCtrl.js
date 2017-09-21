const ImageDB = require('../models/images');
const fs = require('fs');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'nodexperts',
  api_key: '611966755818566',
  api_secret: '5IRHcHH0yHBMB6M6kDWPj3uvTnc' 
})

exports.addImages = function(req, res){
  console.log("It comes here: ..... ", req.files);
  var newImg = new ImageDB();
  newImg.img.data = fs.readFileSync(req.files.photo[0].path);
  console.log("This is the image----------->", newImg.img);
  newImg.img.contentType = 'image/png';
  newImg.save(function(err){
    if(err){
      return res.send(err);
    }
    res.send({newImg});
  });
}

exports.getImages = function(req, res) {
  ImageDB.find(function(err, image) {
    if (err)
      res.send(err);

    // res.json({
    //   data : image
    // });
    res.send(image);
  });
}
