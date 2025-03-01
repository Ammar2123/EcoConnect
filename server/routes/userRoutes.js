const express = require("express");
const router = express.Router();
const { createUser, getUser, onBoarding, updateUser } = require("../controllers/userController");

router.post("/create", createUser);
router.get("/", getUser);
router.get("/checkOnboarding", onBoarding);
router.put("/updateUser", updateUser);

module.exports = router;