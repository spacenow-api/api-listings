module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || 'spacenowtest',
    password: process.env.DATABASE_PASSWORD || 'Spac.918273!',
    database: process.env.DATABASE_SCHEMA || 'spacenow_2019',
    host: process.env.DATABASE_HOST || 'spacenow-test.cjo4zy3wnflc.ap-southeast-2.rds.amazonaws.com',
    dialect: "mysql",
    logging: true,
    underscored: true,
    freezeTableName: true
  }
}