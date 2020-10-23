const knex = require('knex');

const connection = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'node',
        password: 'password',
        database: 'myContacts',
        port: 3305,
        socketPath: '/var/run/mysqld/mysqld.sock'
    }
})


module.exports = connection;