const post = async (client, newRequest) => {
    try {
        await client.connect()
        const result = await client.db("test").collection("testCollection").insertOne(newRequest);

        console.log('New request TEST: ' + result);
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

module.exports = post;