import { MongoClient } from "mongodb"
// Replace the uri string with your MongoDB deployment's connection string.


export default async  function selectAnswer(req, res) {
    console.log('req.body', req.body)
    const uri = 'mongodb://localhost:27017'
    const client = new MongoClient(uri)
    let selectedQuiz;
    try {
        await client.connect()
        // create a filter for a movie to update
        const filter = { questionId: req.body.id };
        // create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                selectedAnswerId: req.body.selectedAnswerId,
                selectedQuestionTitle: req.body.selectedQuestionTitle,
            },
        };
        const result = await client.db('admin').collection('Questions').updateOne(filter, updateDoc);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
        selectedQuiz = result
    }
    catch (e) {
        console.log(e)
    }
    finally {
        await client.close();
    }
    res.status(200).json(
        {selectedQuiz}
    )
}
