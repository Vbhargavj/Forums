// config/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // optional, specify folder to store images in Cloudinary
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
