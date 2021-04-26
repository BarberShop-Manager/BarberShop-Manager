const Sequelize  = require('sequelize');
const sequelize = new Sequelize('db_bsm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}