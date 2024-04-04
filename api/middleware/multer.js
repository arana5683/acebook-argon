// imports multer library
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// diskStorage is used to set up storage for uploaded files
// it takes the request, represents the file given and creates a callback (cb) function
// the cb fucntion takes null - to highlight no errors or show errors if there are any
// the /uploads shows the directory you want the file saves in 
var uniqueId = uuidv4();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, 'uploads'));
},

// here we create a unique id that is used to name the file - so that files do not override eachother
    filename: (req, file, cb) => {
        cb(null, uniqueId + file.originalname);
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };


const upload = multer({ 
    storage: storage,
    // fileFilter: fileFilter,
});

module.exports = upload;