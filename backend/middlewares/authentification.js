const jwt = require("jsonwebtoken")

const { UserModel } = require("../models/user.model");
const ErrorHandler = require("../utils/error.handler");
const asyncAwaitErr = require("./async.await.error");

exports.isAuthenticatedUser = asyncAwaitErr( async (req,res,next)=>{
    // const {token} = req.cookies;
    // console.log(token)
    const token = req.headers.authorization.split(" ")[1];
    // if(!req.headers.authorization){
    //     return res.send("Please login again");
    // }
    if(!token){
        return next(new ErrorHandler("Plesae login with correct token to access this route", 401));
    }

    const decodedData = jwt.verify(token , process.env.JWT_SECRET);
    req.user = await UserModel.findById(decodedData.id);
    next();
} )

exports.isAuthurized = (...role) =>{
    return (req,res,next) =>{
        if(!role.includes(req.user.role)){
            return next(
                new ErrorHandler(`Roles: ${req.user.role} is not Authorized for this route`),
                403
            )
        }
        next();
    }
}