const usersSchema = require("../models/usersSchema");
const { getAuth } = require("@clerk/express");

const createUser = async (req, res) => {
  try {
    const { data } = await req.body;
    const { id, primary_email_address_id } = data;
    const email = data.email_addresses.find(
      (email) => email.id === primary_email_address_id
    ).email_address;
    const username = data.username;

    await usersSchema.create({
      userName: username,
      email: email,
      clerkUid: data.id,
    });

    res.json({ sucess: true });
  } catch (error) {
    console.error(error);
    res.json({ sucess: false });
  }
};

const getUser = async (req, res) => {
  const auth = getAuth(req);
  const uid = auth.userId;
  console.log("Logged in: ", !!uid);
  const dbUser = await usersSchema.findOne({ clerkUid: uid });
  res.json({ auth, dbUser, loggedIn: !!uid });
};

const deleteUser = async (req, res) => {};

const onBoarding = async (req, res) => {
  try {
    const auth = getAuth(req);
    const uid = auth.userId;
    // const clerkUid = req.user.clerkUid; // Assuming the user is authenticated, and their clerkUid is available

    const user = await usersSchema.findOne({ clerkUid: uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user.onBoarding);
    // Respond with the onboarding status
    return res.status(200).json({ onBoarding: user.onBoarding });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const auth = getAuth(req);
    const uid = auth.userId;
    if (!uid) {
      return res.status(404).json({ message: "User not authenticated" });
    }

    const {
      phone,
      address,
      role,
      branch,
      panOrAadhar,
      companyType,
      businessId,
    } = req.body;
    const user = await usersSchema.findOne({ clerkUid: uid });
console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let metadata = {
      onBoarding: true,
    };

    switch (role) {
      case "staff":
        metadata.branch = branch;
        break;
      case "collector":
        metadata.panOrAadhar = panOrAadhar;
        break;
      case "company":
        metadata.companyType = companyType;
        metadata.businessId = businessId;
        break;
      default:
        break;
    }

    user.phone = phone;
    user.address = address;
    user.metadata = metadata;
    user.onBoarding = true;

    await user.save();

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    // Send a 500 response with the error message
    res.status(500).json({ message: "Internal Server Error" });
  }
  // console.log("Updated user ")
};

module.exports = { createUser, deleteUser, updateUser, getUser, onBoarding };
