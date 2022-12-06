//mongodb://localhost:27017

import {MongoClient} from "mongodb";




export default async function handler(req, res) {

    const uri = 'mongodb://localhost:27017'
    const client = new MongoClient(uri)
    let tests;
    try {
        await client.connect()
        const result = await client.db('admin').collection('Tests').find().toArray()
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

export async function getTest(testId){
    const uri = "mongodb://localhost:27017"
    const client = new MongoClient(uri)

    try{
        await client.connect()
        //{id: testId }
        const result = await client.db("admin").collection("Tests").find({id: testId }).toArray()
        return result
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
    return undefined
}