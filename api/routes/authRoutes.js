// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
function verifyToken(req,res,next){
    let token=req.headers.token;
    try{
        if(!token) throw 'Unauthorised Access'
        let payload=jwt.verify(token,"secret")
        if(!payload)throw 'Unauthorised Access'
        next()
    }catch(error){
        res.json({message:error})
    }
}

router.post('/register', register);
router.post('/login', login);

module.exports = router;
