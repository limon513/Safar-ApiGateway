const express = require('express');
const {info_controller} = require('../../controllers');
const userRoute = require('./user-route');

const router = express.Router();

router.get('/info',info_controller.info);
router.use('/user',userRoute);


module.exports = router;