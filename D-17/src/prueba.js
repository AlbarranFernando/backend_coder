const {mysqlConnect} = require('../DB/mysql.db')
const knex = require('knex')(mysqlConnect)

knex.schema.createTable('producto', table => {
    table.string('title',30)
    table.string('price',10)
    table.string('thumbnail',50)
  })
  .then(() => console.log('table created!'))
  .catch((err) => console.log(err))
  .finally(() => knex.destroy())