const { Client } = require('pg');

let dbConnexionUrl = "";

function DB() {

    /**Function to connect to the PG database.*/
    this.connect = function () {
        this.client = new Client(
            {connectionString: dbConnexionUrl,
            ssl: {
                rejectUnauthorized: false
            }}
        );
        this.client.connect();
    }

    /**Function to disconnect from the PG database.*/
    this.disconnect = function () {
        if(this.client != undefined) {
            this.client.end();
        }
    }
}

module.exports = DB;
