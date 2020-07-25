
const orm = require('../config/orm');

const burger = {
    all: function(stewart) {
        //eieen
        orm.selectAll('burgers', function(res) {
            stewart(res);
        });
    },

    create: function(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, function(res) {
            cb(res);
        });
    },

    update: function(objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, function(res) {
            cb(res);
        });
    },

    delete: function(condition, cb) {
        orm.deleteOne('burgers', condition, function(res) {
            cb(res);
        });
    },


};

module.exports = burger;