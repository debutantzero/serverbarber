const mongoose = require('mongoose');


const produitModels = new mongoose.Schema({

    picture: {
        type: String,
        required: true,
    },

    prix: {
        type: String,
        required: true,
    },
    idUser: {type: String, required: true}


},
    {
        timestamps: true,
    }
)


const produit = mongoose.model("produits", produitModels);
module.exports = produit;


