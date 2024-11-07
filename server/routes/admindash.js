const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    try {
        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
            if (err) return res.status(401).json({ message: 'Access Denied' });
            req.user = user; 
            next(); 
          });      
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

router.get("/find", authMiddleware, async (req, res) => {
	try {
		const users = await User.find();
		if (!users)
			return res.status(401).json({ message: "No users" });
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.get("/findone/:id", authMiddleware, async (req, res) => {
	try {
        const userId = req.params.id;
		const user = await User.findOne({_id:userId});
		if (!user)
			return res.status(401).json({ message: "No users" });
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.put('/edit/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

router.delete('/delete/:id',authMiddleware,  async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json({message : 'user deleted'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = router;