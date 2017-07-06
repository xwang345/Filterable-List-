const Sequelize = require('sequelize');

// set up sequelize to point to our postgres database
var sequelize = new Sequelize('d3mq5ijq7ie3uh', 'clbnxvbmyelxdj', 'a36a015b026a4f1698f9e3a6b90f4d01b79461571c0f60e052b8ad8598bf118a', {
    host: 'ec2-23-21-246-11.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

const Contact = sequelize.define('contactTable',{
    employeeNum:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addresCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    }, {
        createdAt: false, // disable createdAt
        updatedAt: false // disable updatedAt
});

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then((Contact) => {
            resolve();
        }).catch((err) => {
            reject("unable to sync the database");
        });
        reject();
    });
}


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(function(err) {
    console.log('Unable to connect to the database:', err);
});