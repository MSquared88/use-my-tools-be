const express = require('express')
const toolsModel = require('./tools-model')

//middleware
const validateTool = require('../../Utils/validateNewTool')

// async function validateToolid(req, res, next) {
//     id = req.params.id
//     try{
//         toolsModel.getToolsById(id)

//     }
// }

const router = express.Router()

router.get('/tools', async (req, res,) => {
    try{
        const tools = await toolsModel.getTools()
        res.status(200).json(tools)
    }

    catch(err){
        res.status(500).json({ message: 'could not get tools', err })
    }
})

router.get('/tools/:id', async (req, res,) => {
    id = req.params.id
    try{
        const tool = await toolsModel.getToolsById(id)
        res.status(200).json(tool)
    }
    catch(err){
        res.status(500).json({ message: 'could not get tool', err })
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

router.delete('/tools/:id', async (req, res) => {
    const id = req.params.id
    
    try{
        const tool = await toolsModel.deleteTool(id)
        res.status(200).json(tool)
    }
    catch(err){
        res.status(500).json({ message: 'could not delete tool', err })
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