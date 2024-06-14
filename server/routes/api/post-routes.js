// ----------------------------------------------------------------------------------
// Imports Express router and post-controllers
const router = require('express').Router();
const postController = require('../../controllers/post-controller');
const withAuth = require('../../utils/restAuth');

// Imports multer settings
const { uploads, storage } = require('../../utils/multer-settings');

router.post('/api/upload/:id', [withAuth.auth, uploads.single('file')], postController.uploadImage);
router.get('/api/getImage/:postId', postController.showImage);

// Export the router
module.exports = router;