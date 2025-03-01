const contributeSchema = require("../models/contributeSchema");
const collectorSchema = require("../models/collectorSchema");
const userSchema = require("../models/usersSchema");
const { getAuth } = require("@clerk/express");

const fetchContributions = async (req, res) => {
    try {
        // Fetch all contributions
        const contributions = await contributeSchema.find();

        if (!contributions || contributions.length === 0) {
            return res.status(404).json({ message: "No contributions found" });
        }
        const contributionsWithEmail = [];

        for (const contribution of contributions) {
            const user = await userSchema.findOne({ clerkUid: contribution.userId });

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
};

const updateContribution = async(req, res)=>{
    const { status } = req.body
    console.log(status);
    const auth = getAuth(req);
    const uid = auth.userId;
    try{
        const contribution = await contributeSchema.findById(req.params.id);
        if (!contribution) {
            return res.status(404).json({ message: 'Contribution not found' });
        }
        contribution.status = status;
        contribution.updatedBy = uid
        await contribution.save();
        res.status(200).json({ message: 'Contribution status updated successfully', data: contribution });
    }catch(err){
        console.log(err);
    }
}

const confirmOrder = async (req, res) => {
    const { status } = req.body; 
    const auth = getAuth(req);
    const uid = auth.userId;

    try {
        // Find the contribution by ID
        const contribution = await contributeSchema.findById(req.params.id);
        
        if (!contribution) {
            return res.status(404).json({ message: 'Contribution not found' });
        }

        // Update the status field
        contribution.status = status;
        
        // Save the updated contribution status
        await contribution.save();

        // Find the collector based on the clerkUid
        const collector = await userSchema.findOne({ clerkUid: uid });  // Use findOne() to get a single collector

        if (!collector) {
            return res.status(404).json({ message: 'Collector not found' });
        }

        // Calculate the rewards based on category and quantity
        let reward = 0;
        if (contribution.wasteType === 'mix') {
            reward = 1 * contribution.quantity;  // 1 Rs per kg for mix category
        } else {
            reward = 2 * contribution.quantity;  // 2 Rs per kg for other categories
        }

        // Update the collector's reward
        collector.reward += reward;

        // Save the updated collector's reward
        await collector.save();

        res.status(200).json({ message: 'Contribution status and rewards updated successfully', data: contribution });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { fetchContributions, updateContribution, confirmOrder };
