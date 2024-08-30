const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const {SuccessResponse,ErrorResponse} = require('../utils/common');
const AppError = require("../utils/errors/app-error");

async function signUp(req,res) {
    try {
        const response = await UserService.signUp(req.body);
        SuccessResponse.data = response;
        return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        if(error instanceof Error) ErrorResponse.error = error;
        else ErrorResponse.error = new AppError(['service unavailable'],StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
}

async function signIn(req,res) {
    try {
        const response = await UserService.signIn(req.body);
        SuccessResponse.data = response;
        return res.status(StatusCodes.ACCEPTED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        if(error instanceof Error) ErrorResponse.error = error;
        else ErrorResponse.error = new AppError(['service unavailable'],StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    signUp,
    signIn,
}