const userModels = require("../models/user.models")
module.exports.getAll = (req, res) => {
    userModels.find()
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.register = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const entreprise = req.body.entreprise
    userModels.create({ username, password, email, entreprise })
        .then(_ => { res.json("created") })
        .catch(err => { res.json(err) })
}

module.exports.login = async(req, res) => {
    const { username, password } = req.body
    await userModels.find({ username })
        .then((user) => {

            if (user[0].password === password) {
                res.cookie("myId", user[0]._id, { maxAge: 30000000, httpOnly: true })
                res.json(user[0])
            } else { res.json("password incorrect") }

        })
        .catch((err) => { res.json("username incorrect") })
}
module.exports.getUserData = async(req, res) => {
    userModels.findById(req.params.id)
        .then(user => res.json(user))
        .catch((err) => { res.json(err) })
}
module.exports.getUserUpdateData = async(req, res) => {
    userModels.findById(req.params.id)
        .then(user => res.json(user))
        .catch((err) => { res.json(err) })
}

module.exports.online = async(req, res) => {
    res.json(req.cookies)
}

module.exports.updateEntreprise = async(req, res) => {
    userModels.findByIdAndUpdate(req.cookies.myId, { $set: { entreprise: req.body.entreprise } }, { new: true, upsert: true },
        (err, data) => { if (!err) { res.json(data) } else { res.json(err) } }
    )
}

module.exports.updateUsername = async(req, res) => {
    userModels.findByIdAndUpdate(req.cookies.myId, { $set: { username: req.body.username } }, { new: true, upsert: true },
        (err, data) => { if (!err) { res.json(data) } else { res.json(err) } }
    )
}
module.exports.updatePays = async(req, res) => {
    userModels.findByIdAndUpdate(req.cookies.myId, { $set: { pays: req.body.pays } }, { new: true, upsert: true },
        (err, data) => { if (!err) { res.json(data) } else { res.json(err) } }
    )
}
module.exports.updateVille = async(req, res) => {
    userModels.findByIdAndUpdate(req.cookies.myId, { $set: { ville: req.body.ville } }, { new: true, upsert: true },
        (err, data) => { if (!err) { res.json(data) } else { res.json(err) } }
    )
}
module.exports.updateAdress = async(req, res) => {
    userModels.findByIdAndUpdate(req.cookies.myId, { $set: { address: req.body.address } }, { new: true, upsert: true },
        (err, data) => { if (!err) { res.json(data) } else { res.json(err) } }
    )
}

module.exports.logout = async(req, res) => {
    res.cookie("myId", "", { maxAge: 1, httpOnly: true })
    res.json("logout")
}