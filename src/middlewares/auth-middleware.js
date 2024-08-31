const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, Enums } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const jwt = require('jsonwebtoken');
const serverConfig = require("../config/server-config");
const { UserService } = require("../services");

function authenticate(req,res,next){
    const token = req.headers['x-access-token'];
    if(!token){
        ErrorResponse.error = new AppError(['jwt missing'],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
    try {
        const user = jwt.verify(token,serverConfig.JWTSECRET);
        req.body.agencyId = user.userId;
        req.body.agencyName = user.userName;
        req.body.agencyEmail = user.userEmail;
        req.body.agencyPhone = user.userPhone;
        console.log('req body in authentication',req.body);
        next();
    } catch (error) {
        console.log(error);
        ErrorResponse.error = new AppError([error.message],StatusCodes.BAD_REQUEST);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
}

async function authorizeAdmin(req,res,next){
    try {
        const response = await UserService.getUser(req.body.agencyPhone);
        if(!response){
            throw new AppError(['no active admin found'],StatusCodes.NOT_FOUND);
        }
        if(response.role !== Enums.ACC_TYPE.ADMIN){
            throw new AppError(['you are not authorized for this request'],StatusCodes.UNAUTHORIZED);
        }
        next();
    } catch (error) {
        if(error instanceof Error) ErrorResponse.error = error;
        else ErrorResponse.error = new AppError(['service unavailable'],StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }   
}

async function authorizeAgency(req,res,next){
    console.log('in side authorization',req.body);
    try {
        const response = await UserService.getUser(req.body.agencyPhone);
        if(!response){
            throw new AppError(['no active admin found'],StatusCodes.NOT_FOUND);
        }
        if(response.role !== Enums.ACC_TYPE.AGENCY){
            throw new AppError(['you are not authorized for this request'],StatusCodes.UNAUTHORIZED);
        }

        next();
    } catch (error) {
        if(error instanceof Error) ErrorResponse.error = error;
        else ErrorResponse.error = new AppError(['service unavailable'],StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }   
}

module.exports = {
    authenticate,
    authorizeAdmin,
    authorizeAgency,
}