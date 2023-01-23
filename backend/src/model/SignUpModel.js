const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

mongoose.connect  ("mongodb://127.0.0.1:27017/User", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database");
    }
});




const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        isEmail(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
      
},
    token:{
        type:String,
    }
});

// Hash the plain text password before saving
UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password =  bcrypt.hashSync(user.password, 8);
    }
    next();
});



const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;