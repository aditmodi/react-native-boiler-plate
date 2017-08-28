let express  = require('express');
let router = express.Router();
let ctrl = require('../controller/controller');

router.post('/authenticate', ctrl.getToken);
router.get('/', ctrl.check);
router.post('/users',ctrl.addUser);
router.delete('/users/:email',ctrl.deleteUser);
router.use(ctrl.authUser);
router.get('/users',ctrl.admin,ctrl.getAll);
router.get('/users/:email',ctrl.admin,ctrl.getByName);
router.put('/users/:email',ctrl.user,ctrl.updateUser);
module.exports = router;
