require('dotenv').config();
const User = require('../models/user.model')
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');


exports.DaftarUser = async(req, res) => {
    const {fullname, email, password} = req.body

    const hashPassword = await bcryptjs.hash(password, 10) 
    const user = new User({
        fullname: fullname,
        email: email,
        password: hashPassword,
    })

    user.save()

    return res.status(201).json({
        message: 'User berhasil terdaftar',
    })
    
}

exports.LoginUser = async (req, res) => {
    const {email, password} = req.body

    const datauser =  await User.findOne({email: email})
    if(datauser){
        //berhasil Log in dengan email lalui proses berikut
        const passwordUser = await bcryptjs.compare(password, datauser.password )
        if(passwordUser){
            //berhasil Log in dengan password lalui proses berikut
            const data = {
               id: datauser._id
            }
            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)
            return res.status(200).json ({
                message: 'berhasil log in',
                token: token
            })
        }
    }else{
        return res.status(404).json ({
            message: 'email atau password salah',
        })
    }  
}