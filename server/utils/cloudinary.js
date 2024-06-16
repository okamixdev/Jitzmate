const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dsps6unds',
    api_key: '532313973247466',
    api_secret: 'c5dVUrVWq-4ePETgHiAcxSFRgAM'

});

module.exports = cloudinary;