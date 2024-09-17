import mongoose from "mongoose";
import { DB_URL } from "./config.js";
const { Schema } = mongoose;

mongoose.connect(DB_URL);

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		maxLength: 50,
		minLength: 5,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
});

const accountSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	balance: {
		type: Number,
		required: true,
	},
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
export { User, Account };
