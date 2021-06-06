require('dotenv').config()
const mongoose=require('mongoose')

//Enter your MongoUrl
const mongoURL=process.env.DATABASE_URL

mongoose.connection.once('open',()=>{
    console.log('MongoDB Connection Ready.')
})

mongoose.connection.on('error',(err)=>{
    console.error(err.message)
})

async function mongoConnect(){
    await mongoose.connect(mongoURL,{
        useNewUrlParser:true,
        useFindAndModify:false,
        useCreateIndex:true,
        useUnifiedTopology:true,
    })
}

async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}