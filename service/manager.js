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
}

const getAllRequestsByEmployee = async (client, employee) => {
    try {
        await client.connect()
        const resultsPending = await client.db("requests").collection("pendingRequests")
            .find({ employee_id: employee }).toArray();
        const resultsRejected = await client.db("requests").collection("rejectedRequests")
            .find({ employee_id: employee }).toArray();
        const resultsAccepted = await client.db("requests").collection("acceptedRequests")
            .find({ employee_id: employee }).toArray();
        const resultsResolved = resultsAccepted.concat(resultsRejected);
        const result = resultsResolved.concat(resultsPending);
        if (result) {
            console.log(result);
            return result;
        } else {
            console.log(`No Reimbursement Requests from Employee: ${employee}`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    }
}

const getAllEmployees = async (client) => {
    try {
        await client.connect()
        const result = await client.db("employee").collection("employee").find().toArray();
        console.log(result);
        if (result.length !== 0) {
            console.log(result);
            return result;
        } else {
            console.log(`No available employees`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    }
}

const resolveRequest = async (client, reimbursement, decision) => {
    try {
        await client.connect();
        const pending = client.db("requests").collection("pendingRequests");
        const rejected = client.db("requests").collection("rejectedRequests");
        const approved = client.db("requests").collection("approvedRequests");


        const session = client.startSession();

        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };

        try {
            const transactionResults = await session.withTransaction(async () => {
                let aborted = false;
                const reimbursementPending = await pending.findOne({ _id: reimbursement }, { session });

                if (!reimbursementPending) {
                    await session.abortTransaction();
                    console.log("Reimbursement is not in pending state");
                    return;
                }

                reimbursementPending.status = decision

                //this might not work
                const reimbursementInserted = (decision === 'approved'
                    ? approved.insertOne(reimbursementPending, { session })
                    : rejected.insertOne(reimbursementPending, { session }))
                    .then((result) => result).catch((error) => {
                        console.log("insertion error");
                        console.log(error);
                        aborted = true;
                        return;
                    });
                // might not work either
                
                if (!aborted) {
                    const { deletedCount } = await pending.deleteOne({ _id: reimbursement }, { session })
                        .then((result) => result)
                        .catch((error) => {
                            console.log("deletion error");
                            console.log(error);
                            aborted = true;
                            return;
                        });
                    if ( deletedCount ) {
                        return;
                    } else {
                        await session.abortTransaction();
                        console.log("could not delete from pending collection");
                        return;
                    } 
                } else {
                    await session.abortTransaction();
                    console.log("could not insert record");
                    return;
                }
            }, transactionOptions);

            if (transactionResults) {
                console.log(`Reimbursement request ${reimbursement} was resolved`);
                return transactionResults;
            } else {
                console.log(`Reimbursement request cannot be resolved`);
            }
        } catch (e) {
            console.log(e);
        } finally {
            await session.endSession();
        }
    } catch (e) {
        console.log("Error before starting transaction:\n" + e);
    }
}


module.exports = {
    getAllPending,
    getAllResolved,
    getAllRequestsByEmployee,
    getAllEmployees,
    resolveRequest
};
