const express   = require('express');
const router    = express.Router()
const {DaftarUser, LoginUser} = require('../controller/user.controller')

router.post('/daftar', DaftarUser);
router.post('/login', LoginUser)
module.exports = router