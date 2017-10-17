import express from 'express';
let router = express.Router();
import {
  login,
  check,
  register,
  logOut,
  authUser,
  getUser,
  updateUser
} from '../controller/controller';

router.get('/', check);
router.get('/logout', authUser, logOut);
router.post('/register', register);
router.post('/login', login);
router.get('/getUser/:id', authUser, getUser);
router.post('/updateUser/:id', authUser, updateUser)
export { router };
