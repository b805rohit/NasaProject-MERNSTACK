const { checkLaunchExist,getAllLaunches,addNewLaunch,abortLaunch }=require('../../models/launches.models')
const { getPagination }=require('../../services/service')
const Joi =require('joi')

async function httpGetAllLaunches(req,res){
    const { skip,limit }=getPagination(req.query)
    return res.status(200).json(await getAllLaunches(skip,limit))
}

async function httpAddLaunch(req,res){
    const schema=Joi.object({
        mission:Joi.string().required(),
        rocket:Joi.string().required(),
        launchDate:Joi.date().required(),
        target:Joi.string().required()
    })
    try{
        const body=req.body
        body.launchDate=new Date(body.launchDate)
        const value=await schema.validateAsync(body)
        await addNewLaunch(value)
        return res.status(201).json(value)
    }
    catch(err){
        return res.status(400).json({message:err?.details[0]?.message})
    }
}

async function httpAbortLaunch(req,res){
    const id=+req.params.id
    const exist=await checkLaunchExist(id)
    if(!exist){
        return res.status(404).json({error:'Launch Not Found'})
    }
    const abort=await abortLaunch(id)

    if(!abort){
        return res.status(400).json({ok:false})
    }

    return res.status(200).json({ok:true})
}



module.exports={
    httpGetAllLaunches,
    httpAddLaunch,
    httpAbortLaunch
}