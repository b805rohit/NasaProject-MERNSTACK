const express=require('express');

const api=express.Router();

const Planets=require('./routes/planets/planets.route')
const Launches=require('./routes/launches/launches.route')

api.use(Planets)
api.use(Launches)

module.exports = api