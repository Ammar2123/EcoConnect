const express = require('express');
const router = express.Router();
const { fetchContributions, updateContribution, confirmOrder } = require("../controllers/collectorControllers");

router.get("/requests", fetchContributions);
router.patch("/requests/:id", updateContribution);
router.patch("/order/:id", confirmOrder);

module.exports = router;