// Package Imports
import dotenv from 'dotenv';
import * as url from 'node:url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { join } from 'node:path';

// Env Init
dotenv.config({ path: join(__dirname, '../config/config.env') });


// Custom Modules Import
import { deleteData, fetchData, postData } from "./http.js"; // Http custom methods
import { createForm } from './form.js'; // To create multipart form



// Helper functions
import {
    sortSectionName,
    checkCubicInitValues,
    checkDelObjectValues,
    checkCubicSingleValues,
    checkGetFolderValues,
    checkCreateFolderValues,
    checkDeleteFolderValues,
    singleUploadCheckValues,
    folderUploadCheckValues,
    cubicByIdCheck,
} from '../utils/utilities.js'; // Helper functions to sanitize arguments of functions.




// Fn
/**
    ** Cubic class with methods to interact with Content-Delivery Cubics.
*/
class Cubic {

    constructor(token, appID) {
        this.token = token || process.env.cubicToken; // The token from your Cloud Cubic account.
        this.appID = appID || process.env.cubicAppID;
        this.urlBaseLink = process.env.baseLink;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `${this.token}`,
            'AppID': `${this.appID}`
        }
    }

    /**
    ** Get all Delivery Cubics.
    * @param {null}    No parameter.
    * @return {Promise<array>} Returns an array with the with each cubic as an object, returns empty array if no cubic .
    */
    async getAllCubics () {
        try {
            // Check for all variables 
            checkCubicInitValues(this.token, this.appID);
            const url = `${this.urlBaseLink}/api/v1/cubic_cdn/all`;

            const responseData = await fetchData(url, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
    ** Get specific cubic by id.
    * @param {string}    cubicId The id of the cubic you want to access.
    * @return {Promise<object>}     Returns an object representing the cubic .
    */
    async getCubic (cubicId) {
        try {
            checkCubicInitValues(this.token, this.appID);
            cubicByIdCheck(cubicId)
            const url = `${this.urlBaseLink}/api/v1/cubic_cdn/single/${cubicId}`;
            
            const responseData = await fetchData(url, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
    ** Get a specific section from the Cubic eg: 'image', 'music', 'video', 'files'.
    * @param {string}  cubicId The id of the cubic your wish to access.
    * @param {string}  cubicSectionName The section of the cubic you wish to access, eg: 'image', 'music', 'video', 'files'.
    * @return {Promise<object>}  Returns an object .
    */
    async getCubicSection (cubicId, cubicSectionName) {
        try {
            checkCubicInitValues(this.token, this.appID);
            checkCubicSingleValues(cubicId, cubicSectionName);

            const url = `${this.urlBaseLink}/api/v1/cubic_cdn/single/section/${cubicId}/${cubicSectionName}`;
            const responseData = await fetchData(url, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
    ** Get singles folder section from the Cubic eg: 'image', 'music', 'video', 'files'.
    * @param {string}  cubicId The id of the cubic your wish to access.
    * @param {string}  cubicSectionName The section of the cubic you wish to access, eg: 'image', 'music', 'video', 'files'.
    * @return {Promise<object>}  Returns an object .
    */
    async getCubicSectionSingle (cubicId, cubicSectionName) {
        try {
            checkCubicInitValues(this.token, this.appID);
            checkCubicSingleValues(cubicId, cubicSectionName)

            const url = `${this.urlBaseLink}/api/v1/cubic_cdn/single/section/${cubicId}/${cubicSectionName}/singles`;
            const responseData = await fetchData(url, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
    ** Get folders section from the Cubic eg: 'image', 'music', 'video', 'files'.
    * @param {string}  cubicId The id of the cubic your wish to access.
    * @param {string}  cubicSectionName The section of the cubic you wish to access, eg: 'image', 'music', 'video', 'files'.
    * @return {Promise<object>}  Returns an object .
    */
    async getCubicSectionFolders (cubicId, cubicSectionName) {
        try {
            checkCubicInitValues(this.token, this.appID);
            checkCubicSingleValues(cubicId, cubicSectionName);
            const url = `${this.urlBaseLink}/api/v1/cubic_cdn/folder/section/${cubicId}/${cubicSectionName}/folders`;
            
            const responseData = await fetchData(url, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
    ** Get single folder section from the Cubic .
    * @param {string}  cubicId The id of the cubic your wish to access.
    * @param {string}  cubicSectionName The section of the cubic you wish to access, eg: 'image', 'music', 'video', 'files'.
    * @param {string}  folderName The name of the folder you wish to access.
    * @return {Promise<object>}  Returns an object .
    */
    async getCubicFolder (cubicId, cubicSectionName, folderName) {
        try {
            checkCubicInitValues(this.token, this.appID);
            checkGetFolderValues(cubicId, cubicSectionName, folderName);
            const url = `${this.urlBaseLink}/api/v1/cubic_cdn/folder/section/${cubicId}/${cubicSectionName}/folders/${folderName}`;
            
            const responseData = await fetchData(url, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
    ** Create folder section from the Cubic .
    * @param {object}  dataObject The object with keys: "cubicId" "cubicName" "sectionName" "folderName".
    * @return {Promise<object>}  Returns an object .
    */
    async createFolder (dataObject) {
        try {
            checkCubicInitValues(this.token, this.appID);
            checkCreateFolderValues(dataObject);
            const url = `${this.urlBaseLink}/backend/api/v1/cdelivery/card/add/folder`;
            
            const responseData = await postData(url, dataObject, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
    ** Delete folder in the Cubic .
    * @param {object}  fieldsData object must have keys cubicId,cubicName,sectionName,folderName,folderId.
    * @return {Promise<object>}  Returns an object .
    */
    async deleteFolder (fieldsData) {
        try {
            checkCubicInitValues(this.token, this.appID);
            checkDeleteFolderValues(fieldsData);

            const { sectionName } = fieldsData;
            const sortedSectionValue = sortSectionName(sectionName);
            const url = `${this.urlBaseLink}/backend/api/v1/cdelivery/${sortedSectionValue}/folder/delete/full`;
            const dataToServer = fieldsData;

            const responseData = await deleteData(url, dataToServer, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
    ** Upload file to singles folder inside the Cubic .
    * @param {object}  meta A object with keys "cardId" "cardName" "sectionName" "sectionTitle".
    * @param {string}  fieldname The upload name of the files u wish to upload, eg: 'eImage', 'eMusic', 'eVideo', 'eFile'.
    * @param {array}  fileArray The name of the folder you wish to access.
    * @return {Promise<object>}  Returns an object .
    */
    async uploadSingleSection (meta, fieldname, fileArray) {
        try {
            checkCubicInitValues(this.token, this.appID);
            singleUploadCheckValues(meta, fieldname, fileArray);
            const { cubicId, cubicName, sectionName, sectionTitle } = meta;
            const newMeta = { cardId: cubicId, cardName: cubicName, sectionName, sectionTitle };
            const sortedSectionValue = sortSectionName(sectionName);
            const url = `${this.urlBaseLink}/backend/api/v1/cdelivery/${sortedSectionValue}/singles/upload`;
            // Create multipart Form
            const { formToPost, headers } = createForm(newMeta, fieldname, fileArray);
            // Concart default headers and form headers
            const headersObject = Object.assign(this.headers, headers);

            const responseData = await postData(url, formToPost, headersObject);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /** 
        ** Delete file in singles folder inside the Cubic .
        * @param {object}  dataObject A object with keys "userId" "cardId" "cardName" "sectionName" "sectionTitle".
        * @return {Promise<object>}  Returns an object .
    */
    async singleDeleteFile (dataObject) {
        try {
            checkCubicInitValues(this.token, this.appID);
            checkDelObjectValues(dataObject);
            const { sectionName } = dataObject;
            const sortedSectionValue = sortSectionName(sectionName);
            const url = `${this.urlBaseLink}/backend/api/v1/cdelivery/${sortedSectionValue}/singles/delete`;

            const responseData = await deleteData(url, dataObject, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
    ** Upload file to folder in the Cubic .
    * @param {object}  meta A object with keys "userId" "cardId" "cardName" "sectionName" "sectionTitle".
    * @param {string}  fieldname The upload name of the files u wish to upload, eg: 'eImage', 'eMusic', 'eFideo', 'eFile'.
    * @param {array}  fileArray The name of the folder you wish to access.
    * @return {Promise<object>}  Returns an object .
    */
    async uploadFolderSection (meta, fieldname, fileArray) {
        try {
            checkCubicInitValues(this.token, this.appID);
            folderUploadCheckValues(meta, fieldname, fileArray);

            const { sectionName } = meta;
            const sortedSectionValue = sortSectionName(sectionName);
            const url = `${this.urlBaseLink}/backend/api/v1/cdelivery/${sortedSectionValue}/folder/upload`;
            // Create multipart Form
            const { formToPost, headers } = createForm(meta, fieldname, fileArray);
            // Concart default headers and form headers
            const headersObject = Object.assign(this.headers, headers);
            const responseData = await postData(url, formToPost, headersObject);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };


    /**
     ** Delete file in folder inside the Cubic . 
     * @param {object} dataObject A object with keys "userId" "cardId" "cardName" "sectionName" "sectionTitle"
     * @returns {Promise<object>}  Returns an object .
    */
    async folderDeleteFile (dataObject) {
        try {
            checkCubicInitValues(this.token, this.appID);
            checkDelObjectValues(dataObject);
            const { sectionName } = dataObject;
            const sortedSectionValue = sortSectionName(sectionName);
            const url = `${this.urlBaseLink}/backend/api/v1/cdelivery/${sortedSectionValue}/folder/delete`;
            
            const responseData = await deleteData(url, dataObject, this.headers);
            return responseData;
        } catch (error) {
            throw new Error(error);
        }
    };
};







// Export the class
export default Cubic;