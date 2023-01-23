const jwt = require("jsonwebtoken");
const UserModel = require("../model/SignUpModel");
const security = "SomethingSecretisHere";
const auth = async (req,res,next) =>{
  const token = req.header("Authorization");
    try{
        const decoded = jwt.verify(token,security);
        const user = await UserModel.findOne({_id:decoded.id,"tokens.token":token});
        if(!user){
            return res.status(404).send("User not found");
        }
        const {email} = decoded;
        req.token = token;
        req.user = user;
        next(); 
}catch(err){
        return res.status(404).send("Invalid Token");
    }
}

module.exports = auth;