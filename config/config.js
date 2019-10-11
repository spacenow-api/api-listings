module.exports = {
  development: {
    username: "spacenowtest" || process.env.DATABASE_USERNAME,
    password: "Spac.918273!" || process.env.DATABASE_PASSWORD,
    database: "spacenow_2019" || process.env.DATABASE_DATABASE,
    host: "spacenow-test.cjo4zy3wnflc.ap-southeast-2.rds.amazonaws.com" || process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: true,
    underscored: true,
    freezeTableName: true
  }
}