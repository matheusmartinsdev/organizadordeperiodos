require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	port: process.env.DB_PORT,
	logging: false,
});

// (async () => {
// 	try {
// 		await sequelize.authenticate();
// 		console.log("Conectado com sucesso");
// 	} catch (error) {
// 		console.log("Falha na conexão: ", error);
// 	}
// })();

sequelize.sync();

module.exports = sequelize;
