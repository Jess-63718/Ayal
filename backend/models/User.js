const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Resident", "Worker", "Admin","SuperAdmin"], required: true },
  phone: { type: String},
  shop: { type: String},
  services: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      availableTimes: { type: String, required: true },
    },
  ],
  nearby:{type:Boolean, default:true},
  proof: { type: String},
  profile:{type:String},
  verified: { type: Boolean, default: false },  // ✅ New field to track verification

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
