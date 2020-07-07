const express = require('express');
const toolsModel = require('./tools-model');

//middleware
const validateTool = require('../../Utils/validateNewTool');
const imgUpload = require('../../Utils/imgUpload')

const aws = require('aws-sdk');
const multer = require('multer');
const multer3 = require('multer-s3');
const awsConfig = require('../../awsConfig');
const uuid = require('uuid')

const router = express.Router()

router.get('/tools', async (req, res,) => {
    try{
        const tools = await toolsModel.getTools()
        res.status(200).json(tools)
    }

    catch(err){
        res.status(500).json({ message: 'could not get tools', err })
    }
});

router.get('/tools/:id', async (req, res,) => {
    id = req.params.id
    try{
        const tool = await toolsModel.getToolsById(id)
        res.status(200).json(tool)
    }
    catch(err){
        res.status(500).json({ message: 'could not get tool', err })
    }
});



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
    
});

router.put('/tools/:id', async (req, res) => {
    const tool = req.body
    const id = req.params.id

    try{
        const dbRes = await toolsModel.updateTool(id, tool)
        res.status(200).json(dbRes)
    }
    catch(err){
        res.status(500).json({ message: 'could not update tool', err })
    }
});

router.delete('/tools/:id', async (req, res) => {
    const id = req.params.id
    
    try{
        const tool = await toolsModel.deleteTool(id)
        res.status(200).json(tool)
    }
    catch(err){
        res.status(500).json({ message: 'could not delete tool', err })
    }
});

router.post('/tools/requests', async (req, res) => {
    let request = req.body
    const user_id = req.userid
});

router.get('/user-tools', async (req, res) => {
    
    try{
        const user = req.userid
        const tools = await toolsModel.getUserTools(user)

        res.status(200).json(tools)
    }
    catch(err){
        res.status(500).json({ message: 'could not get tools', err })
    }
});



aws.config.update(awsConfig)
let s3 = new aws.S3();

const upload = multer({
    storage: multer3({
        s3: s3,
        bucket: 'usemytools',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
            },
          key: function (req, file, cb) {
            cb(null, req.s3Key)
            }
    })
})

const singleFileUpload = upload.single('image')

function uploadTos3(req, res) {
    req.s3Key = uuid.v4()
    let downloadUrl = `https://usemytools.s3-us-west-2.amazonaws.com/${req.s3Key}`
    return new Promise((resolve, reject) => {
        return singleFileUpload(req,res,err => {
            if(err) return reject(err);
            return resolve(downloadUrl)
        })
    })
}

router.put('/uploadImage/:toolid', (req, res) => {
    const id = req.params.toolid

        uploadTos3(req, res)
        .then(downloadUrl => {

            toolsModel.getToolsById(id)
            .then(tool => {
                tool[0].img_url = downloadUrl
                console.log(tool[0])
                toolsModel.updateTool(id, tool[0])
                .then(dbRes => {
                    res.status(200).json(dbRes)
                })
                .catch(err => {
                    res.status(500).json({ message: 'could not update tool', err })
                    console.log(err)
                })

            })
            .catch(err => {
                res.status(500).json({ message: 'could not get tool', err })
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router