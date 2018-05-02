'use strict';
module.exports = function(app) {
  var polygonRoutes = require('./polygonController');

  // todoList Routes
  app.route('/polygon')
    .get(polygonRoutes.list_all_polygon)
    .post(polygonRoutes.create_a_polygon);


  app.route('/polygon/:polygonType')
    .get(polygonRoutes.read_a_polygon)
    // .put(polygonRoutes.update_a_polygon)
    .delete(polygonRoutes.delete_a_polygon);
};
