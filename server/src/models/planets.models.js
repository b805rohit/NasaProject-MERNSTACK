const parse=require('csv-parse')
const fs=require('fs')
const path=require('path')
const planetsData=require('./planets.mongo')

function isHabitablePlanet(planet){
    return planet['koi_disposition']==='CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol']<1.1
        && planet['koi_prad'] < 1.6
}
function loadPlanetData(){
    return new Promise((resolve,reject)=>{
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
            .pipe(parse({
                comment:'#',
                columns:true
            }))
            .on('data',async (data)=>{
                if(isHabitablePlanet(data)){
                    await savePlanets(data)
                }
            })
            .on('error',(err)=>{
                reject(err)
            })
            .on('end',async ()=>{
                const data=(await getAllPlanets()).length
                console.log(`Found ${data} Habitable Planet.`)
                resolve()
            })
    })
}

async function getAllPlanets(){
    return await planetsData.find({},{_id:0,__v:0})
}

async function savePlanets(planet){
    try{
        await planetsData.updateOne({
            keplerName:planet.kepler_name
        },
        {
            keplerName:planet.kepler_name
        },
        {upsert:true})
    }
    catch(err){
        console.error("Error Updating:",err)
    }
}

module.exports={
    loadPlanetData,
    planets:getAllPlanets()
}