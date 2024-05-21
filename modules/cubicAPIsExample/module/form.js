
// Package Imports
import FormData from 'form-data'; // To create dynamic multipart forms
import { createReadStream } from 'node:fs'; // To read files.




/**
    ** Create a multipart/form to send data with.
    * @param {object}  keysObject object with keys and values that has metadata required for uploading files process.
    * @param {string}  fieldname the name of the file field, for type of files you are uploading "eImage, eMusic, eVideo, eFile".
    * @param {object}  fileArray an array of abjects representing a file each.
    * @return {object} Object with keys : status, formToPost and headers.
*/
const createForm = (keysObject, fieldname, fileArray) => {
    try {
        // create a form to append data and files
        const formToPost = new FormData();
        let headers;

        // Append keysObject Values to the the Form.
        for(let key in keysObject) {
            formToPost.append(key, keysObject[key]);
        }

        // Append each file to the the Form also with its known metadata.
        fileArray.forEach(file => {
            const { originalFilename, size, filepath, mimetype } = file;
            const fileToUpload = createReadStream(filepath);
            formToPost.append(fieldname, fileToUpload, {
                filename: originalFilename,
                contentType: mimetype,
                knownLength: size,
            });
        });
        
        // Extract form headers from the form for http request handler, this enables APIs to correctly parse or read the data on the form .
        headers = formToPost.getHeaders();

        return { status: true, formToPost, headers };
    } catch (error) {
        throw new Error(error);
    }
}



// Exports
export { createForm };