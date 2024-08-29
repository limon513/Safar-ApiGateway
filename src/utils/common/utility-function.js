const bcrypt = require('bcrypt');
const serverConfig = require('../../config/server-config');
const jwt = require('jsonwebtoken');
const AppError = require('../errors/app-error');
const { StatusCodes } = require('http-status-codes');
const Enums = require('./enums');


function hashThePassword(password){
    const hashedPassword = bcrypt.hashSync(password,+serverConfig.SALTROUND);
    console.log(hashedPassword);
    return hashedPassword;
}

function validatePhoneNumber(phone){
    const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
    let cleanedNumber = phone.replace(/\D/g, '');
    if (cleanedNumber.length !== 11 || !cleanedNumber.startsWith('01')) {
        return false;
    }
    const prefix = cleanedNumber.substring(0, 3);
    return validPrefixes.includes(prefix);
}

function validatePIN(PIN){
    const numberRegex = /^\d{6}$/;
    if(!numberRegex.test(PIN)) return false;
    else return true;
}

function checkPIN(plainPIN,encryptPIN){
    try {
        return bcrypt.compareSync(plainPIN,encryptPIN);
    } catch (error) {
        throw new AppError(['Server side problem,please retry sometime later.'],StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function createToken(payload,expiry){
    try {
        return jwt.sign(payload,serverConfig.JWTSECRET,{expiresIn:expiry});
    } catch (error) {
        console.log(error);
        throw new AppError(['Server side problem,please retry sometime later.'],StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function generateVcode(){
    return Math.floor(100000 + Math.random() * 900000);
}

function sortData(sortBy,order,data){
    if(order === 'asc'){
        data.sort((a,b) =>{
            return a[sortBy] - b[sortBy];
        })
        return data;
    }
    data.sort((a,b) =>{
        return b[sortBy] -a[sortBy];
    })
}




module.exports = {
    hashThePassword,
    validatePhoneNumber,
    validatePIN,
    checkPIN,
    createToken,
    generateVcode,
    sortData,
}