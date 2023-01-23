const mongoose = require("mongoose");
const User = require("../model/SignUpModel");

const querySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
     },
    query:{
        type:String,
        required:true,
    },
    response:{
        type:String
    }
})

    

const QueryModel = mongoose.model("Query",querySchema);

module.exports = QueryModel;