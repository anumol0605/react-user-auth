const router = require("express").Router();
const { Admin } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");


router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await Admin.findOne({ email: req.body.email });
		//console.log(user);
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if(req.body.password !== user.password)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;