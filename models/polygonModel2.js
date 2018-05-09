'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var polygonModel= new Schema({
  location: {
    // type: {type : String, required: true},
    // coordinates: []
    // coordinates : [Schema.Types.Mixed]
  },
  coordinates: []
  // parkName: {
  //   type: String,
  //   required: 'Kindly enter the name of the Park'
  // },
  //
  // date_created: {
  //   type: Date,
  //   default: Date.now
  // },
  //
  // polygonType: {
  //   type: [{
  //     type: text,
  //     enum: ['Dog Park', 'Tennis', 'Baseball Field', 'Basketball Court', 'Child Play Area', 'Other']
  //   }],
  // default: ['Other']
  // },
  //
  // comments: {
  //   type: String,
  //   required: 'Kindly enter the name of the Park'
  // },
  //
  // rating: {
  //   type: number,
  //   required: 'Kindly enter the name of the Park'
  // }

});

module.exports = mongoose.model('Polygon', polygonModel);
