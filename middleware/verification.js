const userModels = require("../models/user.models")
const ObjectId= require("mongoose").Types.ObjectId

module.exports.allRoutes= async (req, res, next) => {
    const idCookie= req.cookies.myId
    if(ObjectId.isValid(idCookie)){
        await userModels.findById(idCookie)
            .then((users) => {
                if(users){
                    console.log("continue")
                    next()
                }
            }).catch(err => {
                res.redirect('/api/alluser')
            })
    }else{
        res.redirect('/api/alluser');
        next()
    }

}


module.exports.verifyId= async (req, res, next) => {
    const idCookie = req.cookies.myId
    if(ObjectId.isValid(idCookie)){
        res.json(idCookie)
        next()
    }else{
        console.log("no token")
}
}