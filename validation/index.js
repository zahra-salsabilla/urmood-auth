const {check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({
            status: false,
            message: errors.array()[0].msg
        })
    }
    next()
}

//validation untuk registrasi
exports.validationDaftar = [
    check('fullname', 'isi dengan nama lengkap').notEmpty(),
    check('email', 'isi dengan email').notEmpty().matches(/.+\@.+\..+/).withMessage('gunakan @ pada email'),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({min: 8}).withMessage('password minimal 8 karakter'),
]

//validation untuk login
exports.validationLogin = [
    check('email', 'isi dengan email yang terdaftar').notEmpty().matches(/.+\@.+\..+/).withMessage('gunakan @ pada email'),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({min: 8}).withMessage('password minimal 8 karakter'),
]