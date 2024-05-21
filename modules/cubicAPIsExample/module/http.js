// Package Imports
import axios from "axios";


// Global Vars
const abortController = new AbortController();


// Helpers
import { checkHttpStatus, checkHttpErrorType } from "../utils/utilities.js"; // Error handlers helper functions

// Functions
/**
    ** Get data via http .
    * @param {string}  urlLink the link of the API you want to access.
    * @param {object}  reqOptions request headers and options.
    * @return {object}  Returns an object or throws an error .
*/
const fetchData = async (urlLink, reqOptions) => {
    try {
        const httpTask = await axios.get(urlLink, {
            headers: reqOptions,
            signal: abortController.signal
        });
        checkHttpStatus(httpTask);
        const response = await httpTask.data;
        return response;
    } catch (error) {
        checkHttpErrorType(error);
    }
}


/**
    ** Post data via http .
    * @param {string}  urlLink the link of the API you want to access.
    * @param {object}  dataToPost request data to send to server.
    * @param {object}  reqOptions request headers and options.
    * @return {object}  Returns an object or throws an error .
*/
const postData = async (urlLink, dataToPost, reqOptions) => {
    try {
        const httpTask = await axios.post(urlLink, dataToPost, {
            headers: reqOptions,
            signal: abortController.signal
        });
        checkHttpStatus(httpTask);
        const response = await httpTask.data;
        return response;
    } catch (error) {
        checkHttpErrorType(error);
    }
}


/**
    ** Delete data via http .
    * @param {string}  urlLink the link of the API you want to access.
    * @param {object}  metaData metadata to send to server for delete process.
    * @param {object}  reqOptions request headers and options.
    * @return {object}  Returns an object or throws an error .
*/
const deleteData = async (urlLink, metaData, reqOptions) => {
    try {
        const httpTask = await axios.delete(urlLink, {
            headers: reqOptions,
            signal: abortController.signal,
            data: metaData
        });
        checkHttpStatus(httpTask);
        const response = await httpTask.data;
        return response;
    } catch (error) {
        checkHttpErrorType(error);
    }
}


export {
    fetchData,
    postData,
    deleteData
}