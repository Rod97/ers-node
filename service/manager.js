const getAllPending = async (client) => {
    try {
        await client.connect()
        const result = await client.db("requests").collection("pendingRequests")
            .find().toArray();

        if (result.length !== 0) {
            console.log(result);
            return result;
        } else {
            console.log(`No pending requests`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    } 
    finally{
        client.close();
    }
}

const getAllResolved = async (client) => {
    try {
        await client.connect()
        const resultsRejected = await client.db("requests").collection("rejectedRequests")
            .find().toArray();
        const resultsAccepted = await client.db("requests").collection("acceptedRequests")
            .find().toArray();

        const result = resultsAccepted.concat(resultsRejected);
        if (result.length !== 0) {
            console.log(result);
            return result;
        } else {
            console.log(`No Resolved Requests`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    } 
}




const getAllByEmployeePending = async (client, employee) => {
    try {
        await client.connect()
        const result = await client.db("requests").collection("pendingRequests")
            .find({ employee_id: employee }).toArray();

        if (result) {
            console.log(result);
            return result;
        } else {
            console.log(`No listings found with the name ${employee}`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    } 
    finally{
        client.close();
    }
}
const getAllByEmployeeResolved = async (client, employee) => {
    try {
        await client.connect()
        const resultsRejected = await client.db("requests").collection("rejectedRequests")
            .find({ employee_id: employee }).toArray();
        const resultsAccepted = await client.db("requests").collection("acceptedRequests")
            .find({ employee_id: employee }).toArray();

        const result = resultsAccepted.concat(resultsRejected);
        if (result) {
            console.log(result);
            return result;
        } else {
            console.log(`No listings found with the name ${employee}`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    } 
}

module.exports = {
    getAllPending,
    getAllResolved
    // updateREquestStatus
};
// const post = async (client, newRequest) => {
//     try {
//         await client.connect()
//         const result = await client.db("requests").collection("pendingRequests").insertOne(newRequest);
//     } catch (e) {
//         console.log(e);
//     } finally {
//         await client.close();
//     }
// }