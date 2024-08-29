const express = require('express');
const { UserController } = require('../../controllers');
const { UserMiddewares} = require('../../middlewares');


const router = express.Router();

router.post('/signup',UserMiddewares.signUp,UserController.signUp);

module.exports = router;