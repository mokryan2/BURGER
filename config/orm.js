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
    selectAll: (burgers, cb) => {
        var queryString = "SELECT * FROM " + burgers + ";";
        connection.query(queryString, (err, result) => { 
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    
}



module.exports = orm;