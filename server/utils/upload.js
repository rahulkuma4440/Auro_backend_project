import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

// Configure GridFS storage
const storage = new GridFsStorage({
    url: `mongodb://user:codeforinterview@blogweb-shard-00-00.ch1hk.mongodb.net:27017,blogweb-shard-00-01.ch1hk.mongodb.net:27017,blogweb-shard-00-02.ch1hk.mongodb.net:27017/BLOG?ssl=true&replicaSet=atlas-lhtsci-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const allowedTypes = ["image/png", "image/jpg"];

        if (!allowedTypes.includes(file.mimetype)) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: "photos", // Specify the bucket name
            filename: `${Date.now()}-blog-${file.originalname}` // Custom file naming convention
        };
    }
});

// Export the multer configuration
const upload = multer({ storage });

export default upload;
