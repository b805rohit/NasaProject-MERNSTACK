const mongoose=require('mongoose')

const mongoURL='mongodb+srv://b805rohit:Rr%40786786@bunnyapp.yza1w.mongodb.net/nasa?authSource=admin&replicaSet=BunnyApp-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

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