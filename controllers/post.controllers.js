const postModels = require("../models/post.produit.models");
const userModels = require("../models/user.models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.postProduit = async(req, res) => {
    const { prix } = req.body;
    const idUser = req.cookies.myId;
    const idCookie = req.cookies.myId;
    try {
        if (ObjectId.isValid(idCookie)) {
            if (req.file.detectedMimeType == "image/jpeg" ||
                req.file.detectedMimeType == "image/jpg" ||
                req.file.detectedMimeType == "image/png") {
                if (req.file.size <= 10000000) {
                    const filename = Date.now() + ".jpg";
                    pipeline(
                        req.file.stream,
                        fs.createWriteStream(
                            `${__dirname}/../../client/public/images/${filename}`
                        )
                    )
                    await postModels.create({ picture: `./images/${filename}`, idUser, prix })
                        .then(user => {
                            res.json("created");
                        })
                        .catch(err => res.json(err));

                } else {
                    res.json("fichier trop volumineux");
                }
            } else {

                res.json("format interdit");
            }
        } else {
            console.log("no token");
        }
    } catch (error) {
        res.json(error);
    }
}

module.exports.getProduits = async(req, res) => {
    const idUser = req.params.id;
    await postModels.find({ idUser })
        .then((data) => {
            res.json(data);
        })
        .catch(err => res.json(err));
}


module.exports.removePost = async(req, res) => {
    await postModels.findByIdAndDelete(req.params.id)
        .then(users => {
            res.json("deleted");
        })
        .catch(err => res.json(err));
}
module.exports.newPrix = async(req, res) => {
    await postModels.findByIdAndUpdate(
        req.params.id, { $set: { prix: req.body.prix } }, { new: true, upsert: true },
        (err, data) => {
            if (!err) res.json(data);

        }
    )
}

module.exports.profilImage = async(req, res) => {
    try {

        if (req.file.detectedMimeType === "image/jpg" || req.file.detectedMimeType === "image/png" || req.file.detectedMimeType === "image/jpeg") {
            if (req.file.size < 10000000) {
                const filename = "profil_img.jpg";
                pipeline(
                    req.file.stream,
                    fs.createWriteStream(
                        `${__dirname}/../../client/public/profil/${filename}`
                    )
                );
                await userModels.findByIdAndUpdate(req.cookies.myId, { $set: { picture: "./profil/" + filename } }, { new: true, upsert: true },
                    (err, data) => {
                        if (!err) res.json(data);
                    }
                )
            }
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports.setId = async(req, res) => {
    const id = req.body.id;
    res.cookie("brbuid", id, { maxAge: 1000000000, httpOnly: true });
    res.json(id);
}

module.exports.getProduitsForClient = async(req, res) => {
    if (ObjectId.isValid(req.cookies.brbuid));
    await postModels.find({ idUser: req.cookies.brbuid })
        .then((users) => {
            res.json(users);
        })
        .catch(err => {
            res.json("**" + err);
        })
}

module.exports.getOne = (req, res) => {
    postModels.findById(req.cookies.prod_id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.json("**" + err);
        })
}

module.exports.setProduit = async(req, res) => {
    const id = req.body.id;
    res.cookie("prod_id", id, { maxAge: 1000000000 });
    res.json("req");
}