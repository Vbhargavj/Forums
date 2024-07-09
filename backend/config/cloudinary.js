// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'djgfzl7a3', 
    api_key: '882112858363691', 
    api_secret: '0PHANDjpqzGpcww9NT4dfqjz3p4' // Click 'View Credentials' below to copy your API secret
});

module.exports = cloudinary;
