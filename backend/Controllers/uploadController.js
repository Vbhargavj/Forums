const multer = require('multer');
const User = require('../Model/UserModel');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_images',
    format: async (req, file) => 'jpeg', // supports promises as well
    public_id: (req, file) => req.user._id + '_profile',
  },
});

const upload = multer({ storage: storage });

exports.uploadImage = (req, res) => {
  upload.single('photo')(req, res, async function (err) {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).send({ error: err.message });
    }
    if (req.file) {
      try {
        const user = await User.findById(req.user._id); // assuming you have user authentication and req.user contains user info
        if (!user) {
          return res.status(404).send({ error: 'User not found' });
        }

        // Delete the old image from Cloudinary if it exists
        if (user.photo) {
          const publicId = user.photo.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        }
        // Save new image URL to User model
        user.photo = req.file.path;
        await user.save({ validateBeforeSave: false });
        return res.status(200).send({ imageUrl: req.file.path });
      } catch (error) {
        console.error('Error saving photo to user:', error);
        return res.status(500).send({ error: 'Error saving photo to user' });
      }
    }
    console.error('No file uploaded');
    return res.status(400).send({ error: 'No file uploaded' });
  });
};
