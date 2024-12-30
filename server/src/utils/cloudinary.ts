import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const bufferToStream = (buffer: Buffer) => {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null); // end of the stream
    return readable;
};

const uploadOnCloudinary = async (fileBuffer: Buffer) => {
    try {
        // Use Promise to wrap the upload stream logic and await its resolution
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' }, // auto handles different formats
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error); // Reject promise with error
                    } else {
                        resolve(result); // Resolve promise with result
                    }
                }
            );

            bufferToStream(fileBuffer).pipe(stream); // Convert buffer to stream and upload
        });

        return result; // Return the result on successful upload
    } catch (error) {
        console.error("Failed to upload file to Cloudinary:", error);
        throw error; // Rethrow or handle the error appropriately
    }
};

export { uploadOnCloudinary };