const ImageDB = require('../models/images');
const fs = require('fs');

exports.addImages = function(req, res){
  var newImg = new ImageDB();
  newImg.img.data = fs.readFileSync(req.files.userPhoto.path);
  console.log(newImg);
  newImg.img.contentType = 'image/png';
  newImg.save(function(err){
    if(err){
      return res.send(err);
    }
    res.json({
      status: 'ok',
    })
  });
}
