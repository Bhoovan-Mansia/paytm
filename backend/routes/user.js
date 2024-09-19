import express from "express";
import zod from "zod";
import { User, Account } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config.js";
import UserAuthMiddleware from "../middleware/userAuth.js";

const userRouter = express.Router();

const userSignupZod = zod.object({
	firstName: zod.string().max(50),
	lastName: zod.string().max(50),
	username: zod.string().max(50).email(),
	password: zod.string().min(6),
});

const userSigninZod = zod.object({
	username: zod.string().max(50),
	password: zod.string().min(6),
});

const userUpdateZod = zod.object({
	firstName: zod.string().max(50).optional(),
	lastName: zod.string().max(50).optional(),
	password: zod.string().min(6).optional(),
});

userRouter.post("/signup", async (req, res) => {
	const { firstName, lastName, username, password } = req.body;
	const { error } = userSignupZod.safeParse({
		firstName,
		lastName,
		username,
		password,
	});
	if (error) {
		return res.status(411).json({ message: "Incorrect inputs" });
	}

	const checkUser = await User.findOne({ username });
	if (checkUser) {
		return res.status(411).json({ message: "Email already taken" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new User({
		firstName: firstName,
		lastName: lastName,
		username: username,
		password: hashedPassword,
	});
	const savedUser = await newUser.save();

	const userAccount = new Account({
		userId: savedUser._id,
		balance: Math.floor(1000 + Math.random() * 10000),
	});
	await userAccount.save();

	const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);

	return res
		.status(200)
		.json({ message: "User created successfully", token: token });
});

userRouter.post("/signin", async (req, res) => {
	const { username, password } = req.body;
	const { error } = userSigninZod.safeParse({ username, password });
	if (error) {
		return res.status(411).json({ message: "Incorrect inputs" });
	}

	const user = await User.findOne({ username });
	if (!user) {
		return res.status(411).json({ message: "Error while logging in" });
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.password);
	if (!isPasswordCorrect) {
		return res.status(411).json({ message: "Error while logging in" });
	}

	const token = jwt.sign({ userId: user._id }, JWT_SECRET);
	return res
		.status(200)
		.json({ message: "User logged in successfully", token: token });
});

userRouter.put("", UserAuthMiddleware, async (req, res) => {
	const { firstName, lastName, password } = req.body;
	const { error } = userUpdateZod.safeParse({
		firstName,
		lastName,
		password,
	});
	if (error) {
		return res.status(411).json({ message: "Incorrect inputs" });
	}
	const user = await User.findById(req.userId);

	if (firstName) {
		user.firstName = firstName;
	}
	if (lastName) {
		user.lastName = lastName;
	}
	if (password) {
		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
	}

	await user.save();
	return res.status(200).json({ message: "User updated successfully" });
});

userRouter.get("/bulk", UserAuthMiddleware, async (req, res) => {
	const filter = req.query.filter || "";
	const users = await User.find({
		$or: [
			{ firstName: { $regex: filter } },
			{ lastName: { $regex: filter } },
		],
	});

	const userList = users.map((user) => {
		return {
			firstName: user.firstName,
			lastName: user.lastName,
			id: user._id,
		};
	});

	return res.status(200).json({
		users: userList,
	});
});

userRouter.get("/me", UserAuthMiddleware, async (req, res) => {
	const user = await User.findById(req.userId);
	return res.status(200).json({
		status: true,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		id: user._id,
	});
});

export { userRouter };
