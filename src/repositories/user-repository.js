const Crud = require("./crud-repository");
const {User} = require('../models');
const { where, Op } = require("sequelize");

class UserRepository extends Crud{
    constructor(){
        super(User);
    }

    async signUp(data){
        try {
            const response = await User.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getUser(data){
        try {
            const response = await User.findOne({
                where:{
                    [Op.or]:{
                        userEmail:data,
                        userPhone:data,
                    }
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserRepository;