const jwt=require('jsonwebtoken');
require('dotenv').config();
const {promisify}=require('util');
const User=require('../models/users');

const verify=promisify(jwt.verify);
const auth=async (req,res,next)=>{
    const {authorization}=req.headers;
    const user =await verify(authorization,process.env.SECRET_KEY)
    .catch(e=>res.status(401).end());
    req.user=await User.findById(user.userId);
    next();
}
module.exports=auth;