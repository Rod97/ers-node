const getAllPending = async (client) => {
    var result = undefined;
    try {
        result = await client.db("ers").collection("requests")
            .find({ status: 'Pending' }).toArray();

        if (result.length !== 0) {
            console.log(result);
        } else {
            console.log(`No pending requests`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    } finally {
        return result;
    }
}

const getAllResolved = async (client) => {
    var result = undefined;
    try {
        result = await client.db("ers").collection("requests")
            .find({ status: { '$ne': 'Pending' } }).toArray();
        if (result.length !== 0) {
            console.log("query successful");
        } else {
            console.log(`No Resolved Requests`)
        }
    } catch (e) {
        console.log("Error\n" + e);
    } finally {
        return result;
    }
}

const getAllRequestsByEmployee = async (client, employee) => {
    let result = undefined;
    try {
        result = await client.db("ers").collection("requests")
            .find({ employee_id: employee }).toArray();

        if (result.length !== 0) {
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
        const result = await client.db("ers").collection("employee").find({ manager: false }).toArray();
        if (result.length !== 0) {
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
        const requests = client.db("ers").collection("requests");

        const session = client.startSession();

        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };

        try {
            const transactionResults = await session.withTransaction(async () => {
                const reimbursementPending = await requests.findOne({ _id: reimbursement, status: 'Pending' }, { session });
                if (!reimbursementPending) {
                    await session.abortTransaction();
                    console.log("Reimbursement is not in pending state");
                    return;
                }
                //update status
                reimbursementPending.status = decision
                //replace in db
                const updatedRequest = await requests.replaceOne({ _id: reimbursement, status: 'Pending' }, reimbursementPending, { upsert: false, session })
                if (updatedRequest.matchedCount !== 1 || updatedRequest.modifiedCount !== 1) {
                    await session.abortTransaction();
                    console.log("Something went wrong updating the database");
                    return updatedRequest;
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
