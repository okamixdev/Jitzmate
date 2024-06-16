require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    // cloud_name: 'dsps6unds',
    // api_key: '532313973247466',
    // api_secret: 'c5dVUrVWq-4ePETgHiAcxSFRgAM'
});

module.exports = cloudinary;