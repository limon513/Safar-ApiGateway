const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const UserRepo = new UserRepository();

async function signUp(data) {
    try {
        const response = await UserRepo.signUp(data);
        return response;
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            let explainations = [];
            error.errors.forEach((err)=>explainations.push(err.message));
            throw new AppError(explainations,StatusCodes.BAD_REQUEST);
        }
        throw error;
    }
}

module.exports = {
    signUp,
}