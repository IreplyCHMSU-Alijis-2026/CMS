const express = require('express');
const {register,login,refreshToken} = require("../controller/loginRegisterController");
const router =express.Router();


router.post('/register',register);
router.post('/login',login);
router.get('/refresh',refreshToken)

module.exports = router;