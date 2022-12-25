import {MongoClient} from "mongodb";





export default async  function getResult(req, res){
    const { result } = await req.query
    const testId = await result

    console.log('questionId', testId, req.query)
    const uri = 'mongodb://localhost:27017'
    const client = new MongoClient(uri)
    let questions;
    try {
        await client.connect()
        const result = await client.db('admin').collection('Questions').find({testId: parseInt(testId) }).toArray()
        questions = result
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
    res.status(200).json(
        {questions}
    )
}