const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { validatePhoneNumber } = require("../utils/common/utility-function");

function signUp(req,res,next){
    if(!req.body.userName){
        ErrorResponse.error = new AppError(['user name required'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.userEmail){
        ErrorResponse.error = new AppError(['user email required'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.userPhone){
        ErrorResponse.error = new AppError(['user phone required'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!validatePhoneNumber(req.body.userPhone)){
        ErrorResponse.error = new AppError(['invalid phone number'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.password){
        ErrorResponse.error = new AppError(['password required'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    signUp,
}