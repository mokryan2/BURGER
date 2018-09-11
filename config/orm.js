const connection = require("../config/connection.js");

// Loop function that will convert "?" => string
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
};

// Converts key/value pair to SQL 
function objToSql(ob) {
    var arr = [];

    // Pushes into arr
    for (var key in ob) {
        var value = ob[key];
        // skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
};

const orm = {
    selectAll: (tableInput, cb) => {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: (table, cols, vals, cb) => {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    updateOne: (burgers, objColVals, condition, cb) => {
        var queryString = "UPDATE " + burgers;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: (table, condition, cb) => {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};



module.exports = orm;