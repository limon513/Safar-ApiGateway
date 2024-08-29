const Crud = require("./crud-repository");
const {User} = require('../models');

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

}

module.exports = UserRepository;