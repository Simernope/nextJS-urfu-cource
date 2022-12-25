import {MongoClient} from "mongodb";

export default async function handler(req, res) {
    const { id } =await req.query
    const test =await id[0]
    //const question =await id[1]
    console.log(req.query)
   console.log('test', test, 'question',)
   //res.end(`Post: ${id}`)

    const uri = 'mongodb://localhost:27017'
    const client = new MongoClient(uri)
    let tests;
    try {
        await client.connect()
        const result = await client.db('admin').collection('Tests').find({id: parseInt(test)}).toArray()
        tests = result
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
    res.status(200).json(
        {tests}
    )
}