const router = require('express').Router();
const {getUser} = require('../controllers/userCtrl');
const {verifyToken} = require('../middlewares/verifyToken');

router.get('/:id',verifyToken, getUser);

module.exports = router;