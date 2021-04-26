const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_bsm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const userNew = sequelize.define('users', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    _name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            notNull: { msg: "Escreva um nome" }
        }
    },
    _username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            notNull: { msg: "Escreva um nome de usuário" }
        }
    },
    _email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notNull: { msg: "Escreva um email" }
        },
        unique: true
    },
    _cpf: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true
    },
    _date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    _password: {
        type: Sequelize.INTEGER(100),
        allowNull: false,
        validate: {
            notNull: { msg: "Escreva uma senha" }
        }
    },
    _telephone: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Escreva um telefone" }
        }
    },
    _nivel: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});
