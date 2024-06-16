// -------------------------------------------------------------------------
// Dependencies
const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../utils/cloudinary');

// test
const chekAPI = async (req, res) => {
    return res.status(200).send({
        status: 'SUCCESS',
        message: 'API WORKING'
    })
}


// -------------------------------------------------------------------------
// Upload Files
const uploadImage = async (req, res) => {

    // Check if the file exists
    if (!req.file) {
        return res.status(404).send({
            status: 'ERROR',
            message: 'No file provided'
        })
    }

    // Get the post ID
    const postID = req.params.id;

    // Get the file name
    let image = req.file.originalname;

    // Get the file extension
    let imageExtension = image.split('.')[1];

    // Check if the file is an image
    if (imageExtension != 'png' && imageExtension != 'jpg' && imageExtension != 'jpeg' && imageExtension != 'gif') {

        // Delete the file if it is not an image
        const filePath = req.file.path;
        const deletedFile = fs.unlinkSync(filePath);

        // Return error
        return res.status(400).send({
            status: 'ERROR',
            message: 'Invalid file type'
        });
    };

    // Save the image to the DB
    try {
        // // // Update the user
        // const postImgInfo = await Post.findByIdAndUpdate({ user: req.user.id, _id: postID }, { file: req.file.filename }, { new: true })
        // // Return result
        // res.status(200).send({
        //     status: 'SUCCESS',
        //     message: 'Image uploaded succesfully',
        //     post: postImgInfo,
        //     post_image: image,
        //     // result
        // })

        cloudinary.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    status: 'ERROR',
                    message: 'Error with cloudinary'
                })
            }

            //Update the user
            const postImgInfo = await Post.findByIdAndUpdate({ user: req.user.id, _id: postID }, { file: result.secure_url }, { new: true })
            // Return result
            res.status(200).send({
                status: 'SUCCESS',
                message: 'Image uploaded succesfully',
                post: postImgInfo,
                post_image: image,
                result
            })
        })

    } catch (err) {
        return res.status(500).send({
            status: 'ERROR',
            message: 'Error saving the image to the DB'
        })
    }
};

// -------------------------------------------------------------------------
// Return images
const showImage = async (req, res) => {

    // Get the file name
    const postId = req.params.postId;
    const postData = await Post.findOne({ _id: postId })
    const filePath = './uploads/postImages/' + postData.file;

    // Check if the file exists
    fs.stat(filePath, (err, exist) => {
        if (err || !exist) {
            return res.status(404).send({
                status: 'ERROR',
                message: 'File does not exist'
            })
        }

        // Return the file
        res.status(200).sendFile(path.resolve(filePath));
    });
};

module.exports = {
    uploadImage,
    showImage,
    chekAPI
};