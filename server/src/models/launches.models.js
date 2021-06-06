const axios = require('axios');
const launcesModel=require('./launches.mongo')
const planetData=require('./planets.mongo')

const URL="https://api.spacexdata.com/v4/launches/query"

let launchFlightNumber=100

async function getLaunchesData(){
    const response = await axios.post(URL,{
            "query":{},
            "options":{
                "pagination":false,
                "populate": [{ "path":"rocket","select":{"name":1}},{"path":"payloads","select":{"name":1,"customers":1}}]
            }
        }
    )
    if(response.status!==200){
        console.log('Error Downloading Launches Data')
    }
    for(const data of response.data.docs){
        const customers=data.payloads.flatMap(d=> d.customers)
        const obj={
            flightNumber:data.flight_number,
            mission:data.name,
            rocket: data.rocket.name,
            launchDate:data.date_local,
            customers,
            upcoming: data.upcoming,
            success:data.success
        }

        await saveLaunches(obj)
    }
}

async function loadLaunchData(){
    const checkLaunchExist=await findLaunch({
        flightNumber:1,
        mission:'FalconSat',
        rocket:'Falcon 1'
    })

    if(checkLaunchExist){
        console.log('Launches Data Already Loaded')
    }
    else{
        await getLaunchesData()
    }
}

async function findLaunch(filter){
    return await launcesModel.findOne(filter) 
}

async function checkLaunchExist(id){
    return await findLaunch({flightNumber:id})
}

async function getAllLaunches(skip,limit){
    return await launcesModel.find({},{"_id":0,"__v":0}).sort({flightNumber:1}).skip(skip).limit(limit)
}

async function getLatestFlightNumber(){
    const launch=await launcesModel.findOne({}).sort('-flightNumber')
    if(!launch){
        return launchFlightNumber
    }
    return launch.flightNumber
}

async function addNewLaunch(launch){
    const planet=await planetData.findOne({keplerName:launch.target})
    if(!planet){
        throw new Error('No Matching Planet not found')
    }
    const flightNumber=await getLatestFlightNumber() + 1
    await saveLaunches(
        Object.assign(launch,{
                flightNumber:flightNumber,
                customer:['ZTM','NASA'],
                upcoming:true,
                success:true
        })
    )
}

async function abortLaunch(id){
    const result=await launcesModel.updateOne({
        flightNumber:id
    },{
        success:false,
        upcoming:false
    });

    return result.ok && result.nModified
}


async function saveLaunches(launch){
    try{
        await launcesModel.findOneAndUpdate({
            flightNumber:launch.flightNumber
        },launch,{
            upsert:true
        })
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports={
    checkLaunchExist,
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    loadLaunchData
}