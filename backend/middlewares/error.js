// const {ErrorHandler} = require("../utils/error.handler")

const ErrorHandler = require("../utils/error.handler");

const errMiddleware =( err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server error";

    // in case we find or put wrong mongo Id.
    if( err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message,400);
    }

    // mongoose duplicate key error

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Submitted`
        err = new ErrorHandler(message,400)
    }

    // Josn-web-token error

    if(err.code === "JsonWebTokenError"){
        const message = `Josn-web-token is invalid try again`
        err = new ErrorHandler(message,400)
    }

    // Josn-web-token expires error

    if(err.code === "TokenExpiredError"){
        const message = `Josn-web-token is expired, try again`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success : false,
        error : err.message
    })
}

module.exports = {errMiddleware}