const mongo = require('mongoose');
const UsersDB = mongo.model("User", require('../db/userSchema'));
const {hashPassword, checkPassword} = require('../servises/password.servis');
const authService = require('../servises/jwt.servis');

class UserCRUD{
    async create(req,res,next){
        const {login, password} = req.body;
        const jwt = authService().issue(login);

        const chekUser =await  UsersDB .findOne( {login });

        if(await chekUser){
            if( await checkPassword(password, await chekUser.password)){
                res.status(200).json({
                    success:true,
                    u: await chekUser,
                    auth: await jwt
                })
            }
            else{
                res.status(500).json({
                    success:false,
                    message:"неверный пароль"
                })
            }
        }
        else{
            const new_User = new UsersDB({
                login:login,
                password:await hashPassword(password)
            })
            await new_User.save()
            res.status(201).json({
                success:true,
                u: await new_User,
                auth: await jwt
            })
        }
    }

    async read(req,res,next){
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }

        UsersDB.find()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec(function (err, doc) {
                if(err) { res.status(500).json(err); return; };
                res.status(200).json(doc);
            });
    }
    async update(req,res,next){
        const {login, password} = req.body;

        if (login){
            UsersDB.findOneAndUpdate({login: req.user.username}, {login:login})
        }

        if (password){
            UsersDB.findOneAndUpdate({login: req.user.username}, {password:await hashPassword(password)})
        }

    }
    async delete(req,res,next){
        await UsersDB.deleteOne({login: req.user.username},function (result) {
            res.status(200).json({succcess: true})
        })

    }
}

module.exports = new UserCRUD();

