'use strict';

var mongoose = require('mongoose'),
  Polygon = mongoose.model('Polygon');

exports.list_all_polygon = function(req, res) {
  console.log('in list_all_polygon')
  Polygon.find({}, function(err, polygon) {
    if (err)
      res.send(err);
    res.json(polygon);
  });
};

exports.create_a_polygon = function(req, res) {
  console.log('create new')
  console.log(req.body)
  var new_polygon = new Polygon(req.body);
  new_polygon.save(function(err, polygon) {
    if (err)
      res.send(err);
    res.json(polygon);
  });
};


exports.read_a_polygon = function(req, res) {
  // Polygon.findById(req.params.taskId, function(err, task) {
  //   if (err)
  //     res.send(err);
  //   res.json(polygon);
  // });
};


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


exports.delete_a_polygon = function(req, res) {


  // Polygon.remove({
  //   _id: req.params.Polygon
  // }, function(err, task) {
  //   if (err)
  //     res.send(err);
  //   res.json({ message: 'Polygon successfully deleted' });
  // });
};
