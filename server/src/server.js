require('dotenv').config()

const http=require('http')
const app=require('./app')
const { loadPlanetData } = require('./models/planets.models')
const { loadLaunchData } = require('./models/launches.models')
const PORT=process.env.PORT || 8000
const {mongoConnect}=require('./services/mongo')

const server=http.createServer(app)


async function startServer(){
    //Connect MongoDb
    await mongoConnect()
    //Load Planets Data
    await loadPlanetData()
    // Load Launches
    await loadLaunchData()
    
    server.listen(PORT,()=>{
        console.log(`Listening On Port ${PORT}...`)
    })
}

startServer()
