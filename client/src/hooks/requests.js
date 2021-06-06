const localHost=`http://localhost:8000/v1`
async function httpGetPlanets() {
  const res=await fetch(`${localHost}/planets`)
  return await res.json()
}

async function httpGetLaunches() {
  const res=await fetch(`${localHost}/launches`)
  const fetchLaunches=await res.json()
  return fetchLaunches.sort((a,b)=>a.flightNumber-b.flightNumber)
}

async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${localHost}/launches`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(launch)
    })
  }
  catch (err){
    return{
      ok:false
    }
  }
}

async function httpAbortLaunch(id) {
  try{
    return await fetch(`${localHost}/launches/${id}`,{
      method:'DELETE',
    }) 
  }
  catch(err){
    return{
      ok:false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};