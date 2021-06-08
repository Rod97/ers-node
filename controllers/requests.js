const getRequests = (req, res) => {
    res.status(200).json({ success: true, data: employee })
}
const createRequest = (req, res) => {
    const { name } = req.body
    if(!name){
        return res.status(400).json({ success: false, msg: 'Provide a name'})
    }
    res.status(200).json({ success: true, data: name })
}

module.exports = {
    getRequests,
    createRequest
}