const {CloudinaryStorage} = require ('multer-storage-cloudinary');

const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY
});


const removeImages = async (req, res) => {
  
  try {
    const {publicID} = req.params
    const results = await cloudinary.uploader.destroy(publicID);

    if(results == 'not found') {
      throw new Error('Delete Images Failed!')
    }

    res.status(200).json({
      massage: "Remove images successfully",
      
    })

  } catch (error) {
    res.status(400).json({
      name: error.name,
      message: error.message
    });
  }
}

const uploadImages = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path)

    const uploadImgs = [];

    for (let image of images) {
      const results = await cloudinary.uploader.upload(image);
      uploadImgs.push({
        url: results.secure_url,
        publicID: results.public_id
      })
    }
    
    res.status(200).json({
      massage: "Upload images successfully",
      data: uploadImgs
    })

  } catch (error) {
    res.status(400).json({
      name: error.name,
      message: error.message
    })
  }
}


const storage = new  CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "demo-youtube-clound-nodejs",
    format: 'jpg'
  }
})

const upload = multer({ storage: storage }); //tạo ra một midleware trước khi up ảnh lên cloudimage


module.exports = { upload, removeImages, uploadImages }
