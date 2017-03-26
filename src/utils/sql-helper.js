import sql from 'msnodesqlv8';

export default class SqlHelper {
    server = null;
    database = null;

    constructor(sever, database) {
        this.server = sever;
        this.database = database;
    }

    getConnectionString() {
        return `Driver={SQL Server};Server=${this.server};Trusted_Connection={Yes};Database={${this.database}};`
    };

    execQuery = (query) => new Promise((resolve, reject) => {
        sql.open(this.getConnectionString(), (connErr, conn) => {
            if (connErr) {
                reject(connErr);
                return;
            }
            conn.query(query, (queryErr, results) => {
                if (queryErr) {
                    conn.close();
                    reject(queryErr);
                    return;
                }
                resolve(results);
            })
        });
    });

    execQueryWithParams = (query, params) => new Promise((resolve, reject) => {
        sql.open(this.getConnectionString(), (connErr, conn) => {
            if (connErr) {
                reject(connErr);
                return;
            }
            conn.query(query, params, (queryErr, results) => {
                if (queryErr) {
                    conn.close();
                    reject(queryErr);
                    return;
                }
                resolve(results);
            })
        });
    });
}