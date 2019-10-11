module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: true,
    underscored: true,
    freezeTableName: true
  }
}