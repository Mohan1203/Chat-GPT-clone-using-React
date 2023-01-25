const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const UserModel = require("../model/SignUpModel");
const jsw = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const auth = require("../authentication/auth")
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config({path:"/.env"});
const queryModel = require("../model/querymodel");

app.use(express.json());
app.use(cors())
const security = "SomethingSecretisHere"
router.use((req, res, next) => {
    next();
})



router.post("/SignUp", async (req, res) => {
    const data = req.body;
    
    const email = data.email;
    let user = new UserModel(data);

    const oldUser = await UserModel.findOne({ email: email })
    if (oldUser) {
        return res.status(400).send("User Already Exist Please Login")
    }
    try {
        const token = jsw.sign({ id: user._id,email }, security, { expiresIn: "1h" })
        user.token = token; 
        await user.save();
        
      return   res.status(200).send(user);
    } catch (error) {
     
        return res.status(400).send("Something went wrong");
    }
});

router.post("/SignIn", async (req, res) => {
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).send("User not found");
        }
        if(user && (bcrypt.compareSync(req.body.password,user.password))){
            const token = jsw.sign(
                {id:user._id,email},
                security,
                {expiresIn:"1h"});
                user.token = token;
            await user.save();

           return  res.status(200).send(user);

        }else{
           return res.status(400).send("Invalid Credentials")
        }

    } catch (error) {
        
        return res.status(404).send("User not found or Invalid Credentials")
    }
})


router.post("/home",auth,async(req,res)=>{
    try{
        
        const {props} = req.body;
        const configuration = new Configuration ({
            apiKey: process.env.OPENAI_API_KEY || "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"
        });
          const openai = new OpenAIApi(configuration);
          const response = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: `${props}`,
              temperature: 0,
              max_tokens: 500,
            });
            
            
            const userQuery = new queryModel({query:props,user:req.user._id,response:response.data.choices[0].text});
            await userQuery.save();
            return res.send(userQuery);      
    }catch(error){
       return  res.status(400).send(error)
    }
})

router.get("/home",auth,async(req,res)=>{
    try{
        const data = await queryModel.find({user:req.user._id});
       
        res.send(data)
    }catch(e){
       
        res.send({message:"Error in fetching user"})
    }
})

router.get("/protect",auth,async(req,res)=>{
    try{

        return res.send(true)
    }catch(err){
     return    res.status(404).send("Error in fetching use")
    }
})


router.post("/clearchat",auth,async(req,res)=>{
    try{
        const data = await queryModel.deleteMany({user:req.user._id});
        return res.send("Chat Cleared")
    }catch(err){
        return res.status(404).send("Error in fetching user")
    }
})

router.post("/logout",auth,async(req,res)=>{
    try{
        const token = req.user.token;
        const user = await UserModel
        .findOne
        ({token:token})
        user.token = null;
        await user.save();
        // localStorage.removeItem("token");
        return res.send("User Logged Out")
    }catch(error){
        return res.status(404).send(error)
    }
})




module.exports = router;