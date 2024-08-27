const User = require('../models/user');

const handleLogin = async()=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({error:"All fields are required"});
    }
    const user = await User.findOne({email,password});
    if(!user){
        res.status(400).json({error:"Invalid credentials"});
    }
    return res.redirect('/');
}

const handleSignup = async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400).json({error:"All fields are required"});
    }
    if(password.length < 6){
        res.status(400).json({error:"Password must be atleast 6 characters long"});
    }
    if(email.indexOf('@') === -1){
        res.status(400).json({error:"Invalid email"});
    }
    //check if user already exists
    const user = await User.findOne({email});
    if(!user){
    await User.create({
        name:name,
        email:email,
        password:password
    });
    res.send('login');
    }
    else{
       return res.status(400).json({error:"User Exists"});
    }
}

module.exports = {handleLogin,handleSignup};