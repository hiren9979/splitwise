import dbConn from '../db/db.js';
import { v4 as uuidv4 } from "uuid";


// executeQuery function
export async function executeQuery(query, parameters) {
    return new Promise((resolve, reject) => {
        dbConn.query(query, parameters, (err, rows) => {
            if (err) {
                reject(err); // Reject on error
            } else {
                resolve(rows); // Resolve with rows on success
            }
        });
    });
}


export function generateV4uuid(){
    return uuidv4();
}