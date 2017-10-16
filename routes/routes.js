import express from 'express';
let router = express.Router();
import {
  login,
  check,
  register,
  logOut,
  authUser,
  getUser
} from '../controller/controller';

router.get('/', check);
router.get('/logout', authUser, logOut);
router.post('/register', register);
router.post('/login', login);
router.post('/getUser/:id', authUser, getUser)
export { router };
