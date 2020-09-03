const express = require('express')
const toolsModel = require('./tools-model');


const router = express.Router()

router.post('/tools/requests', async (req, res) => {
    let request = req.body
    const id = req.userid
    request.requestor_id = id
    
    try{
        const toolRes = await toolsModel.addRequest(request)

        res.status(201).json(toolRes)
    }

    catch(err){
        res.status(500).json({ message: 'could not add tool', err })
    }
});

router.get('/tools/requests', async (req, res,) => {
    const id = req.userid
    console.log('id', id)
    try{
        const requests = await toolsModel.toolRequests(id)
        res.status(200).json(requests)
    }

    catch(err){
        res.status(500).json({ message: 'could not get requests', err })
    }
});

module.exports = router