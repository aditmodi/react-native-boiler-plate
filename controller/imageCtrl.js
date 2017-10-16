import ImageDB from '../models/images';
import User from '../models/user';
import fs from 'fs';
import cloudinary from 'cloudinary';
import { identity } from './controller';

export const addImages = (req, res) => {
  var newImg = new ImageDB();
  var regex64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
  if (req.body.data !== null && req.body.id !== null){
    if(regex64.test(req.body.data) && req.body.data !== null){
      if (identity.equals(req.body.id) == true){
        cloudinary.uploader.upload(`data:image/jpg;base64,${req.body.data}`, (result) => {
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
      else {
        res.json({
          success: false,
          message: 'Wrong userId'
        })
      }
    }
    else {
      res.json({
        success: false,
        message: 'Not a base64 image'
      })
    }
  }
  else {
    res.json({
      success: false,
      message: 'Either data or id is null'
    })
  }
}

export const getImages = (req, res) => {
  if(req.headers.token && identity.equals(req.params.id) == true){
    ImageDB.find({userId: req.params.id}).sort({date: -1}).exec((err, imageUrl) => {
      if (err)
      res.send('tttttt' + err);
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
