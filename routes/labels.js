import express from 'express';
var router = express.Router();
import {
  addLabel
} from '../controller/labelCtrl';
import {
  authUser
} from '../controller/controller';

router.post('/setLabel', authUser, addLabel);
export {router};
