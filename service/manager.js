const { result } = require("lodash");

const getAllPending = async (client) => {
    var result = undefined;
    try {
        await client.connect()
        result = await client.db("requests").collection("pendingRequests")
            .find().toArray();

        if (result.length !== 0) {
            console.log(result);
        } else {
            console.log(`No pending requests`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    } 
    finally{
        await client.close();
        return result;
    }
}

const getAllResolved = async (client) => {
    var result = undefined;
    try {
        await client.connect()
        const resultsRejected = await client.db("requests").collection("rejectedRequests")
            .find().toArray();
        const resultsAccepted = await client.db("requests").collection("acceptedRequests")
            .find().toArray();

        result = resultsAccepted.concat(resultsRejected);
        if (result.length !== 0) {
            console.log(result);
        } else {
            console.log(`No Resolved Requests`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    }
    finally{
        await client.close();
        return result;
    } 
}

module.exports = {
    getAllPending,
    getAllResolved,
};
