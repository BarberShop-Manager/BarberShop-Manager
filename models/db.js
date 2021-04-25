const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_bsm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.export = {
    Sequelize: Sequelize,
    sequelize: sequelize
}