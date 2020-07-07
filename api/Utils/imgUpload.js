const aws = require('aws-sdk');
const multer = require('multer');
const multer3 = require('multer-s3');
const awsConfig = require('../awsConfig');
const uuid = require('uuid')

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


module.exports = upload.single('image'), (req, res, next) => {
    
}
