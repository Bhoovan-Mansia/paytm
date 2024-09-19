import express from "express";
import mongoose from "mongoose";
import UserAuthMiddleware from "../middleware/userAuth.js";
import { Account } from "../db.js";
import zod from "zod";

const accountRouter = express.Router();

const accountTransferZod = zod.object({
	to: zod.string().max(50),
	amount: zod.number().positive(),
});

accountRouter.get("/balance", UserAuthMiddleware, async (req, res) => {
	const account = await Account.findOne({ userId: req.userId });
	return res.status(200).json({ balance: account.balance });
});

accountRouter.post("/transfer", UserAuthMiddleware, async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const { to, amountVal } = req.body;
		const amount = parseInt(amountVal);
		const { error } = accountTransferZod.safeParse({ to, amount });
		if (error) {
			await session.abortTransaction();
			return res.status(411).json({ message: "Incorrect inputs" });
		}

		const fromAccount = await Account.findOne({ userId: req.userId }).session(
			session
		);
		if (fromAccount.balance < amount || fromAccount.balance <= 0) {
			await session.abortTransaction();
			return res.status(400).json({ message: "Insufficient balance" });
		}

		const toAccount = await Account.findOne({ userId: to }).session(session);
		if (!toAccount) {
			await session.abortTransaction();
			return res.status(400).json({ message: "Invalid account" });
		}

		fromAccount.balance -= amount;
		toAccount.balance += amount;

		await fromAccount
			.updateOne({ balance: fromAccount.balance })
			.session(session);
		await toAccount
			.updateOne({ balance: toAccount.balance })
			.session(session);

		await session.commitTransaction();
		session.endSession();
		return res.status(200).json({
			message: "Transfer successful",
		});
		
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		return res
			.status(411)
			.json({ message: "Error while transferring money" });
	}
});

export { accountRouter };
