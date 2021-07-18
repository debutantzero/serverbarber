const mongoose=require('mongoose');
const {isEmail} =require('validator')
const userModels= new mongoose.Schema({

    username:{
        type:"string",
        unique: true,
        required:true,
    },
    entreprise: {
        type:"string",
        unique: true,
        required: true,

    },
    email: {
        type:"string",
        unique: true,
        required:true,
        trim:true,
        validate: [isEmail]
    },
    password: {
        type:"string",
        minlenght:4,
    },
    picture:{
        type:String,
    },
    pays:{
        type:String,
    },
    ville:{
        type:String,
    },
    address:{
        type:String,
    }

},
{
    timestamps: true
}
)

const user= mongoose.model('data', userModels);
module.exports= user;