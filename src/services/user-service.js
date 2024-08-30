const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const {Utility} = require('../utils/common');
const serverConfig = require("../config/server-config");
const UserRepo = new UserRepository();

async function signUp(data) {
    try {
        const response = await UserRepo.signUp(data);
        return response;
    } catch (error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explainations = [];
            error.errors.forEach((err)=>explainations.push(err.message));
            throw new AppError(explainations,StatusCodes.BAD_REQUEST);
        }
        throw error;
    }
}

async function signIn(data) {
    try {
        const response = await UserRepo.getUser(data.phoneOrEmail);
        if(!response) throw new AppError(['invalid email or phone'],StatusCodes.BAD_REQUEST);
        const encryptPassword = response.password;
        if(!Utility.checkPIN(data.password,encryptPassword)){
            throw new AppError(['incorrect password'],StatusCodes.BAD_REQUEST);
        }
        const payload = {
            userId:response.id,
            userName:response.userName,
            userEmail:response.userEmail,
            userPhone:response.userPhone,
            role:response.role,
        }
        const token = Utility.createToken(payload,serverConfig.JWTEXPIRY);
        return {
            jwtToken: token,
            messege: "jwt token will expire in 30 days"
        };
    } catch (error) {
        throw error;
    }
}

async function getUser(data) {
    try {
        const response = await UserRepo.getUser(data);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signUp,
    signIn,
    getUser,
}