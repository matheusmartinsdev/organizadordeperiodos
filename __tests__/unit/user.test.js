const User = require("../../src/app/models/user");

const bcrypt = require("bcrypt");

const sequelize = require("../../src/database/database");

describe("User model tests", () => {
	afterEach(() => {
		User.truncate();
	});

	it("should encrypt user password", async () => {
		const user = {
			name: "Matheus",
			email: "matheus@matheusmartins.dev",
			password: "123123123",
		};

		const newUser = await User.create(user);

		expect(bcrypt.compareSync(user.password, newUser.password)).toBe(true);
	});

	it("should validate correct user password", async () => {
		const user = {
			name: "Matheus",
			email: "matheus@matheusmartins.dev",
			password: "123123123",
		};

		const newUser = await User.create(user);

		expect(await newUser.validatePassword(user.password)).toBe(true);
	});

	it("should not validade wrong user password", async () => {
		const user = {
			name: "Matheus",
			email: "matheus@matheusmartins.dev",
			password: "123123123",
		};

		const newUser = await User.create(user);

		expect(await newUser.validatePassword("123123")).toBe(false);
	});
});
