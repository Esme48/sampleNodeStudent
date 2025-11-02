const express = require("express");
const router = express.Router();
const dogs = require("../dogData.js");
const {  ValidationError, NotFoundError, UnauthorizedError } = require("../errors");

router.get("/dogs", (req, res) => {
	res.json(dogs);
});

router.post("/adopt", (req, res, next) => {
    const { name, address, email, dogName } = req.body;
    if (!name || !email || !dogName) {
        return next(new ValidationError("Missing required fields"));
    }

    const dog = dogs.find(d => d.name === dogName);
    if (!dog) {
        return next(new NotFoundError(`${dogName} not found or not available`));
    }

    return res.status(201).json({
        message: `Adoption request received. We will contact you at ${email} for further details.`,
    });
});

router.get("/error", (req, res) => {
	throw new Error("Test error");
});

module.exports = router;
