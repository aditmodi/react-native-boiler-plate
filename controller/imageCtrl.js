import ImageDB from '../models/images';
import User from '../models/user';
import fs from 'fs';
import cloudinary from 'cloudinary';

export const addImages = (req, res) => {
  var newImg = new ImageDB();
  cloudinary.uploader.upload(`data:image/jpg;base64,${req.body.data}`, (result) => {
    console.log("this is the url:", result);
    newImg.img.url = result.secure_url;
    newImg.userId = req.body.id;
    newImg.date = new Date();
    newImg.save((err) => {
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

export const getImages = (req, res) => {
  console.log("token:", req.headers);
  if(req.headers.token){
    ImageDB.find({userId: req.params.id}).sort({date: -1}).exec((err, imageUrl) => {
      console.log("IMAGE URL:::", imageUrl);
      if (err)
      res.send(err);
      res.json({
        'status': 'ok',
        'data': imageUrl
      })
    });
  }
  else {
    res.json({
      message: "Unauthorised user"
    })
  }
}
