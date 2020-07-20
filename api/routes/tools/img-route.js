const express = require('express');
const toolsModel = require('./tools-model');

//aws
const aws = require('aws-sdk');
const multer = require('multer');
const multer3 = require('multer-s3');
const awsConfig = require('../../awsConfig');
const uuid = require('uuid')

const router = express.Router()
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

aws.config.update(awsConfig)

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

router.put('/tools/uploadImage/:toolid', (req, res) => {
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