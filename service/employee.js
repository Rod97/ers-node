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

const post = async (client, newRequest) => {
    try {
         await client.connect();
         console.log("attempting to insert");
         const result = await client.db("requests").collection("pendingRequests").insertOne(newRequest);
         return result;
    } catch (e) {
         console.log(e);
    }
}

module.exports = {
    getAllByEmployeePending,
    getAllByEmployeeResolved,
    post
}