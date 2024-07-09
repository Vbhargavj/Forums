// routes/index.js or routes/upload.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const AuthController=require('../Controllers/AuthController');

router.post('/upload',AuthController.protect, uploadController.uploadImage);

module.exports = router;
