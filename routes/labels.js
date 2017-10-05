import express from 'express';
var router = express.Router();
import {
  addLabel
} from'../controller/labelCtrl';

router.post('/setLabel', addLabel);
export {router};
