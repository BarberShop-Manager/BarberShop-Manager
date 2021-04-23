const Sequelize  = require('sequelize');
const sequelize = new Sequelize('db_bsm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const userNew = sequelize.define('users',{
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    _name: {
        type: Sequelize.STRING(30)
    },
    _username: {
        type: Sequelize.STRING(30)
    },
    _email: {
        type: Sequelize.STRING(60)
    },
    _cpf: {
        type: Sequelize.INTEGER
    },
    _date: {
        type: Sequelize.DATE
    },
    _password: {
        type: Sequelize.INTEGER(100)
    },
    _telephone: {
        type: Sequelize.INTEGER
    },
    _nivel: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}); 