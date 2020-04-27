const express = require('express')
const toolsModel = require('./tools-model')

//middleware
const validateTool = require('../../Utils/validate-tool')

const router = express.Router()

router.get('/tools', async (req, res,) => {
    //assign tool to userid in token
    //and make tool available true
    req.body.available = 1
    req.body.owner_id = req.userid

    const tool = req.body
    try{
        const tools = await toolsModel.getTools()
        res.status(200).json(tools)
    }

    catch(err){
        res.status(500).json({ message: 'could not get tools', err })
    }
})

router.post('/tools', validateTool,  async (req, res) => {
    const id = req.userid
    const tool = req.body
    tool.owner_id = id
    
    try{
        const toolRes = await toolsModel.addTool(tool)

        res.status(201).json(toolRes)
    }

    catch(err){
        res.status(500).json({ message: 'could not add tool', err })
    }
    
})

router.get('/user-tools', async (req, res) => {
    
    try{
        const user = req.userid
        const tools = await toolsModel.getUserTools(user)

        res.status(200).json(tools)
    }
    catch(err){
        res.status(500).json({ message: 'could not get tools', err })
    }
})

module.exports = router