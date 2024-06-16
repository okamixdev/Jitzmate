// ---------------------------------------------------------------
// Import dependencies

// Imports multer
const multer = require('multer');
const SharpMulter = require("sharp-multer");

// // Set up multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/postImages/')
//     },

//     filename: (req, file, cb) => {
//         cb(null, 'post-' + Date.now() + '--' + file.originalname);
//     }
// });

// Set up multer storage
const storage = SharpMulter({
    destination: (req, file, cb) => {
        cb(null, './uploads/postImages/')
    },

    imageOptions: {
        filename: (req, file, cb) => {
            cb(null, 'post-' + Date.now() + '--' + file.originalname);
        },
        fileFormat: "jpg",
        quality: 100,
        resize: { width: 500, height: 500 },
    }
});

// Set up multer file filter
const uploads = multer(); // { storage: storage }


module.exports = {
    storage,
    uploads
};