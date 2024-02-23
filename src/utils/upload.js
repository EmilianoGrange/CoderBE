import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'public/img',
    filename: (req, file, cb) => {
        const uid = `${Date.now()}-${Math.floor(Math.random() * 1E9)}`;
        cb(null, `${uid}.png`); 
    }
});

const upload = multer({storage});

export default upload;