const { Database } = require("sqlite3")

const mysqlConnect = {
    client: 'mysql',
    version: '5.7',
    connection: {
        host : '127.0.0.1',
        user :  'root',
        password : 'zarlanga',
        database : 'productos',
    }

}
module.exports = {

    mysqlConnect
}