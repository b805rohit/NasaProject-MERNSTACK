const app=require("../../app")
const request=require("supertest")
const {mongoConnect,mongoDisconnect}=require('../../services/mongo')

describe("Nasa Test Api",()=>{
    beforeAll(async ()=>{
        await mongoConnect();
    })

    afterAll(async ()=>{
        await mongoDisconnect()
    })
    
    describe("Test Launches Api",()=>{
        const testData={
            "mission": "ZTM Exploration X",
            "rocket": "Explorer ZTM IS1",
            "launchDate": "2050-12-19T18:30:00.000Z",
            "target": "Kepler-442 b"
        }
        test("it should test All Launches with respond with 200 success", async() => {
            await request(app).get('/v1/launches').expect(200)
        })
        test("it Should test Add Launch",async()=>{
            const res=await request(app).post('/v1/launches').send(testData).expect(201)
            
            expect(res.body).toMatchObject({
                mission: 'ZTM Exploration X',
                rocket: 'Explorer ZTM IS1',
                launchDate: "2050-12-19T18:30:00.000Z",
                target: 'Kepler-442 b',
                customer: [ 'ZTM', 'NASA' ],
                upcoming: true,
                success: true
            })
        })
        test("it Should test Add Launch With Invalid Date",async()=>{
            const res=await request(app).post('/v1/launches').send({...testData,launchDate:"tesf"}).expect(400)
            expect(res.body).toStrictEqual({message: '"launchDate" must be a valid date'})
        })
    })
    
    describe("Test Planets Api",async ()=>{
        test("Test All Planets Get /v1/planets",async ()=>{
            await request(app).get('/v1/planets').expect(200)
        })
    })
})