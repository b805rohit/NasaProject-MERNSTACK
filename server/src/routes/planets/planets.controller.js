const { planets }=require('../../models/planets.models')

const getAllPlanets=async(req,res)=>{
    return res.status(200).json(await planets);
}

module.exports ={
    getAllPlanets
}