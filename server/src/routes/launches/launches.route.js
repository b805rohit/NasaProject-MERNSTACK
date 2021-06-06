const express = require('express')
const { httpGetAllLaunches,httpAddLaunch,httpAbortLaunch }=require('./launches.controller')
const router=express.Router()

router.route('/launches')
    .get(httpGetAllLaunches)
    .post(httpAddLaunch)

router.delete('/launches/:id',httpAbortLaunch)

module.exports =router