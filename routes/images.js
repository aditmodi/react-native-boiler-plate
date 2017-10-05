import express from 'express';
var router = express.Router();
import {
  addImages,
  getImages
} from '../controller/imageCtrl';

  router.post('/addPhoto', addImages);
  router.get('/getPhoto/:userId', getImages);
export {router};
