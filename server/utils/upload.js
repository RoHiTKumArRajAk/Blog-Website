import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url : `mongodb://127.0.0.1:27017/BlogWebDB`,        //backend url
    options: {useNewUrlParser:true},
    file: (request, file) => {
        const match = ["image/png","image/jpg"];
  
        if(match.indexOf(file.memeType) === -1){                 //Checking the extension of the files
            return `${Date.now()}-blog-${file.originalname}`;            // date concat with the name of the image so that duplicate does not occur 
        }                   
        
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
        }
    }
});

export default multer({ storage });