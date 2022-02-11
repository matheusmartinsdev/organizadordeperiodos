import { Sequelize, DataTypes, Model } from "sequelize";
const sequelize = require("../../database/database.ts");

const bcrypt = require("bcrypt");

class User extends Model {
	declare name: string;
	declare email: string;
	declare password: string;

	validatePassword = async (password: string) => {
		return await bcrypt.compareSync(password, this.password);
	};
}

User.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "users",
		modelName: "User",
		hooks: {
			beforeCreate: async (user: User) => {
				if (user.password) {
					const salt = await bcrypt.genSaltSync(10, "a");
					user.password = bcrypt.hashSync(user.password, salt);
				}
			},
			beforeUpdate: async (user: User) => {
				if (user.password) {
					const salt = await bcrypt.genSaltSync(10, "a");
					user.password = bcrypt.hashSync(user.password, salt);
				}
			},
		},
	}
);

module.exports = User;
