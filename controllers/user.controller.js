import User from "../models/User.js"

async function signup(req,res) {
    try{
        const {username,email,password}=req.body;
        if(!username||!email||!password){
            return res.status(400).json({status:false,message:"username, email, and password are required"})
        }
        const emailUsed=await User.findOne({email});//check if the email is already in use
        if(emailUsed){
            return res.status(400).json({status:false, message:"Email already used"})
        }
        const usernameUsed=await User.findOne({username})
        if(usernameUsed){
            return res.status(400).json({status:false, message:"Username already used"})
        
        }
        const user=await User.create({username,email,password})

        return res.status(201).json({
            message:"User created",
            user_id:user._id.toString()
        })
        
    }catch(err){
        return res.status(500).json({ status: false, message: "Server error" });
        }


}
async function login(req, res){
    try{
        console.log("Login route hit:", req.body);
        const{username, email, password}=req.body;
        //check that pass and either username or email exist
        if(!password||(!username && !email)){
            return res.status(400).json({ status: false, message: "You should add username or email and password" });
        }
        let user=null
        if(email){
            user=await User.findOne({ email });
        }else if(username){
            user=await User.findOne({ username });
        }
        if(!user){
            return res.status(401).json({ status: false, message: "User doesn't exist" });
        }

        const checkPass=await user.comparePassword(password);//verify password
        if (!checkPass) {
            return res.status(401).json({ status: false, message: "Wrong password" });
        }

        return res.status(200).json({ message: "Login successful." });
        
    }
    catch(err){
        console.error("Login error:", err);
        return res.status(500).json({ status: false, message: "Server error" });
    }
}

export { login, signup };