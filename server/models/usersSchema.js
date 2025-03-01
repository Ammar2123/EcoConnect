const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  clerkUid: String,
  userName: String,
  email: String,
  phone: String,
  address: String,
  role: String,
  branch: String,
  panOrAadhar: String,
  companyType: String,
  businessId: String,
  reward: { default: 0, type: Number },
  onBoarding: { default: false, type: Boolean },
});

module.exports = mongoose.model("user", usersSchema);
