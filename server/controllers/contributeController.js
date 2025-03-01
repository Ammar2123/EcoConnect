const Contribute = require("../models/contributeSchema");
const userSchema = require("../models/usersSchema");
const { getAuth } = require("@clerk/express");

const createContribute = async (req, res) => {
    try {
        const auth = getAuth(req);
        const uid = auth.userId;
        const { quantity, wasteType } = req.body;
        const contribution = new Contribute({ userId: uid, quantity, wasteType });
        await contribution.save();
        res.json({ "status": 200, "success": true });
    } catch (err) {
        console.log(err);
    }
}

const updateContribute = async (req, res) => {
    const userId = req.params.userId;
    const { quantity, wasteType, amount } = req.body;
    try {
        const updatedContribution = await Contribute.findOneAndUpdate(
            { userId, quantity, wasteType, amount },
            { new: true }
        );
        if (!updatedContribution) {
            return res.status(404).json({ success: false, message: "Contribution not found" });
        }
        res.json({ success: true, status: 200, updatedContribution });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteContribute = async (req, res) => {
    // const userId = req.params.userId;
    // try {
    //     const deletedContribution = await Contribute.findOneAndDelete({ userId: userId });
    //     if (!deletedContribution) {
    //         return res.status(404).json({ success: false, message: "Contribution not found" });
    //     }
    //     res.json({ success: true, status: 200, message: "Contribution deleted successfully" });
    // } catch (err) {
    //     res.status(500).json({ success: false, message: err.message });
    // }
}

const fetchContributions = async (req, res) => {
    try {
        // Fetch all contributions
        const contributions = await Contribute.find();

        if (!contributions || contributions.length === 0) {
            return res.status(404).json({ message: "No contributions found" });
        }
        const contributionsWithEmail = [];

        for (const contribution of contributions) {
            const user = await userSchema.findOne({ clerkUid: contribution.updatedBy });

            if (user) {
                contributionsWithEmail.push({
                    ...contribution.toObject(),
                    email: user.email
                });
            } else {
                contributionsWithEmail.push({
                    ...contribution.toObject(),
                    email: null
                });
            }
        }

        return res.status(200).json({ data: contributionsWithEmail });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { createContribute, updateContribute, deleteContribute, fetchContributions };