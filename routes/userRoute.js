const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "Name, email, and password are required", success: false });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send({ message: "User already exists", success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).send({ message: "User created successfully", success: true });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).send({ message: "Error creating user", success: false });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: "Invalid email or password", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid email or password", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.status(200).send({ message: "Successfully logged in", success: true, token });
        }
    } catch (error) {
        console.error("Error logging in user:", error.message);
        res.status(500).send({ message: "Error logging in user", success: false });
    }
});

router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ message: "User not found", success: false });
        } else {
            res.status(200).send({
                success: true, 
                data: user,
            });

        }

    } catch (error) {

        res.status(500).send({ message: "Error getting user info", success: false, error });

    }
});

module.exports = router;
