import {MongoClient} from "mongodb";

export default async function handler(req, res) {
    const { question } = await req.query
    const questionId = await question
    console.log('questionId', questionId, req.query)
    //res.end(`Post: ${id}`)

    const uri = 'mongodb://localhost:27017'
    const client = new MongoClient(uri)
    let quiz;
    try {
        await client.connect()
        const result = await client.db('admin').collection('Questions').find({questionId: parseInt(questionId)}).toArray()
        quiz = result
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
    res.status(200).json(
        {quiz}
    )
}