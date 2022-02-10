const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/database");

const bcrypt = require("bcrypt");

class User extends Model {
	validatePassword = async (password) => {
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
			beforeCreate: async (user) => {
				if (user.password) {
					const salt = await bcrypt.genSaltSync(10, "a");
					user.password = bcrypt.hashSync(user.password, salt);
				}
			},
			beforeUpdate: async (user) => {
				if (user.password) {
					const salt = await bcrypt.genSaltSync(10, "a");
					user.password = bcrypt.hashSync(user.password, salt);
				}
			},
		},
	}
);

module.exports = User;
