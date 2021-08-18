'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    // options
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DOCKER_DB_HOST || process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false
    }
);

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
let models = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return file !== basename &&
               file.slice(-3) === '.js';
    })
    .forEach(file => {
        let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        models[model.name] = model;
    });

for (let modelName in models) {
    let model = models[modelName];
    if (model.associate && model.associate instanceof Function) {
        model.associate(models);
    }
}

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
