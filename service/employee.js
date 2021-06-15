const getAllByEmployeePending = async (client, employee) => {
    try {
        const result = await client.db("ers").collection("requests")
            .find({ employee_id: employee, status:'Pending' }).toArray();

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
        const result = await client.db("ers").collection("requests")
            .find({ employee_id: employee, status: {'$ne':'Pending'} }).toArray();
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
         console.log("attempting to insert");
         const result = await client.db("ers").collection("requests").insertOne(newRequest);
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