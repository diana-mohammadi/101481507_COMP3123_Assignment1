import mongoose from "mongoose";
import bcrypt from "bcrypt";

const user=new mongoose.Schema(//user schema with fields
    {
    username: {type:String,required: true, trim: true, unique: true},
    email:    { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }, // hashed
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }

);
user.pre("save",async function() {//runs before saving the user
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password, 10);//hashed the pass
    }
    
})
user.methods.comparePassword = async function (pass) {//for comparing the text pass with the hashed pass
  return bcrypt.compare(pass, this.password);

};
export default mongoose.model("User", user);//export