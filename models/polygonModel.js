'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var polygonModel= new Schema({
  polygonType: {
    type: [{
      type: String,
      enum: ['Dog Park', 'Tennis', 'Baseball Field', 'Basketball Court', 'Child Play Area', 'Other']
    }],
  default: ['']
  },

  Parkname: {
    type: String,
    required: 'Kindly enter the name of the Park'
  },

  polygonArray: [],

  date_created: {
    type: Date,
    default: Date.now
  },

  Comments: {
    type: String,
    required: 'Kindly enter the name of the Park'
  },

  Rating: {
    type: Number,
    required: 'Kindly enter the name of the Park'
  }

});

module.exports = mongoose.model('Polygon', polygonModel);
