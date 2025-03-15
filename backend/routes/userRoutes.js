const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post('/add', async (request, response) => {
    const { name, email, phone, address } = request.body;
    try {
        const newUser = new User({ name, email, phone, address });
        await newUser.save();
        response.status(201).json(newUser);
    } catch (error) {
        response.status(500).json({ message: "Error adding user", error: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ message: "Error fetching users", error: error.message });
    }
});



router.put('/users/:id', async (request, response) => {
    try {
        const user = await User.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true }
        );
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        response.status(200).json(user);
    } catch (error) {
        response.status(400).json({ message: "Error updating user", error: error.message });
    }
});


router.delete('/:id', async (request, response) => {
    try {
        const user = await User.findByIdAndDelete(request.params.id);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        response.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        response.status(500).json({ message: "Error deleting user", error: error.message });
    }
});


router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
                { address: { $regex: query, $options: 'i' } },
            ],
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

module.exports = router;
