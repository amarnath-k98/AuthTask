import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "manager"],
        default: "user"
    }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
});


userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};




const User = model("User", userSchema);
export default User;