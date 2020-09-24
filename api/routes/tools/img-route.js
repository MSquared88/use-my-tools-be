const express = require('express');
const toolsModel = require('./tools-model');

//aws
const aws = require('aws-sdk');
const multer = require('multer');
const multer3 = require('multer-s3');
const awsConfig = require('../../awsConfig');
const uuid = require('uuid')

const router = express.Router()


const myCredentials = new aws.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:6a8afa03-a9f9-4323-a843-3cb2773b56cb',
});
aws.config.update(awsConfig)
aws.config.update(myCredentials)
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
    let awsUrl = `https://usemytools.s3-us-west-2.amazonaws.com/${req.s3Key}`
    return new Promise((resolve, reject) => {
        return singleFileUpload(req,res,err => {
            if(err){
                return reject(err);
            } 
            return resolve(awsUrl)
        })
    })
}

router.put('/tools/uploadImage/:toolid', (req, res) => {
    const id = req.params.toolid

        uploadTos3(req, res)
        .then(downloadUrl => {

            toolsModel.getToolsById(id)
            .then(tool => {
                tool.img_url = downloadUrl
                console.log(tool[0])
                toolsModel.updateTool(id, tool)
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

function deleteImg(fileName) {
    var params = {
        Bucket: 'usemytools',
        Key: fileName
    };
    return new Promise((resolve, reject) => {
        return s3.deleteObject(params, function (err, data) {
            if (data != null) {
                console.log("File deleted successfully", data);
                return resolve(data)
            }
            else {
                console.log("Check if you have sufficient permissions : "+err);
                return reject(err)

            }
        })
    });
}
const deleteImgMiddleware = async (req,res,next) => {
    const id = req.params.toolid
    
    const tool = await toolsModel.getToolsById(id)

    if(tool.img_url === null){
        res.status(500).json({ message: 'Url already null'})
    }
    const fileName = tool.img_url.split('/').slice(-1)[0];
    req.body.tool = tool
    deleteImg(fileName)
    .then(() => {
        next()
    })
    .catch(err => {
        res.status(500).json({ message: 'aws error', err })
    })
}


router.put('/tools/deleteImg/:toolid',deleteImgMiddleware, async (req, res) => {

    try{
        const id = req.params.toolid
        let tool = req.body.tool
        let toolWithoutImg = {...tool, img_url: null}
        const updatedTool = await toolsModel.updateTool(id, toolWithoutImg)
        res.status(200).json(updatedTool)
    }
    catch(err){
        res.status(500).json({ message: 'could not update tool', err })
    }

})

module.exports = router