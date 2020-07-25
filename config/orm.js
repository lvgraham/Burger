const connection = require('./connection');

const objToSql = function (object) {
    let output = [];
    for(let key in object){
        //give it json object will take the key as a column and then put an equal sign with the value associated with that key in the object
        // object[key]
        //create an array of keys associated with their values in sql syntax
        output.push(key + '=' + object[key]);
    }
    return output.toString();
}

const orm = {
    selectAll: function(tableInput, eileen) {
        let queryString = 'SELECT * FROM ' + tableInput + ';';
        //talking to the database - getting the info
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            eileen(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        let queryString = 'INSERT INTO' + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    updateOne: function(table, objColVals, condition, cb) {
        let queryString = 'UPDATE' + table;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

}

//export the orm object for the model
module.exports = orm;