import express from 'express';
var router = express.Router();
import {
  addImages,
  getImages
} from '../controller/imageCtrl';
import {
  authUser
} from '../controller/controller';

  router.post('/addPhoto', authUser, addImages);
  router.get('/getPhoto/:id', authUser, getImages);
export {router};
