const express = require('express');
const router = express.Router();

const burger = require('../models/burger');

router.get('/', function(req, res){
    //stewart
    burger.all(function(data) {
        let hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/burgers', function(req, res){
    burger.create(['burger_name'], [req.body.name], function(data) {
        console.log(data);
        res.redirect('/');
    });
});

router.put('/api/burgers/:id', function(req, res) {
    let condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.update({
        //setting column devoured to TRUE
        devoured: true
        //at the condition ID 
    }, condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    connection.query("DELETE FROM plans WHERE id = ?", [req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });

module.exports = router;

