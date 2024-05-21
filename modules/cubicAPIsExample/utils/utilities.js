
// *Functions

/**
    ** Sort Section name, to enable generating suitable API url link dynamically.
    ** If you use Cubic class method (getCubic), on the returned Cubic object the (content) key is an object that has keys: 'image', 'music', 'video', 'files' .
    * @param {string}  sectionNameValue eg: 'image', 'music', 'video', 'files'.
    * @return {string}  Returns a sorted section name string .
*/
const sortSectionName = (sectionNameValue) => {
    const sectionNameOptions = {
        "music": "image",
        "video": "video",
        "files": "file",
        "image": "image",
    }
    if(!sectionNameOptions[sectionNameValue]) throw new Error('Section name is not valid !!!');
    return (sectionNameOptions[sectionNameValue]);
}


/**
    ** Check http response for errors.
    * @param {object}  response object from http response.
    * @return {string}  Throws an error if request was not successfull.
*/
const checkResStatus = (response) => {
    const { status, error } = response;
    if (status === 'error' || status === 'false')
        throw new Error(error);
};


/**
    ** Check token and appID Values.
    * @param {string}  token you wish to use from your account.
    * @param {string}  appID that goes with the token above.
    * @return {string}  Throws an error if any of the values is missing or wrong type.
*/
const checkCubicInitValues = (token,appID) => {
    if (token == '' || typeof token !== 'string')
        throw new Error('Token is missing !!!')
    if (appID == '' || typeof appID !== 'string')
        throw new Error('AppId is missing !!!')
}


/**
    ** Check values are missing or wrong type.
    * @param {object}  objectValue object with to delete a file.
    * @return {string}  Throws an error if any of the key or value is missing or wrong type.
*/
const checkDelObjectValues = (objectValue) => {
    if (objectValue == null || typeof objectValue !== 'object')
        throw new Error('Provide valid data object ...!');
    if (objectValue.sectionName == null || typeof objectValue.sectionName !== 'string')
        throw new Error('Provide valid section name ...!');
}


/**
    ** Check cubicId and cubicSectionName Values.
    * @param {string}  cubicId id of the cubic you wish to access.
    * @param {string}  cubicSectionName the section you wish to access.
    * @return {string}  Throws an error if any of the values is missing or wrong type.
*/
const checkCubicSingleValues = (cubicId, cubicSectionName) => {
    if (cubicId == null || typeof cubicId !== 'string' || cubicId === '' || cubicId === '')
        throw new Error('Provide valid cubic ID ...!');
    if (cubicSectionName == null || typeof cubicSectionName !== 'string' || cubicSectionName === '')
        throw new Error('Provide cubic section name you wish to access ...!');
}


/**
    ** Check cubicId and cubicSectionName, folderName Values.
    * @param {string}  cubicId id of the cubic you wish to access.
    * @param {string}  cubicSectionName the section you wish to access.
    * @param {string}  folderName the folder you wish to access.
    * @return {string}  Throws an error if any of the values is missing or wrong type.
*/
const checkGetFolderValues = (cubicId, cubicSectionName, folderName) => {
    if (cubicId == null || typeof cubicId !== 'string' || cubicId === '')
        throw new Error('Provide valid cubic ID ...!');
    if (cubicSectionName == null || typeof cubicSectionName !== 'string' || cubicSectionName === '')
        throw new Error('Provide cubic section name you wish to access ...!');
    if (folderName == null || typeof folderName !== 'string')
        throw new Error('Provide valid Folder name ...!');
}


/**
    ** Check create folder values and keys.
    * @param {object}  dataObject object with keys ... .
    * @return {string}  Throws an error if any of the values is missing or wrong type.
*/
const checkCreateFolderValues = (dataObject) => {
    if (dataObject == null || typeof dataObject !== 'object')
        throw new Error('Provide valid object argument ...!');
    if (dataObject.cubicId == null || typeof dataObject.cubicId !== 'string' || dataObject.cubicId === '')
        throw new Error('Provide valid cubic ID ...!');
    if (dataObject.cubicName == null || typeof dataObject.cubicName !== 'string' || dataObject.cubicName === '')
        throw new Error('Provide valid cubic name ...!');
    if (dataObject.sectionName == null || typeof dataObject.sectionName !== 'string' || dataObject.sectionName === '')
        throw new Error('Provide valid section name ...!');
    if (dataObject.folderName == null || typeof dataObject.folderName !== 'string' || dataObject.folderName === '')
        throw new Error('Provide valid folder name ...!');
}


/**
    ** Check delete folder values and keys.
    * @param {object}  fieldsData object with keys ... .
    * @return {string}  Throws an error if any of the values is missing or wrong type.
*/
const checkDeleteFolderValues = (fieldsData) => {
    if (fieldsData == null || typeof fieldsData !== 'object')
        throw new Error('Provide valid data object ...!');
    if (fieldsData.cubicId == null || typeof fieldsData.cubicId !== 'string' || fieldsData.cubicId === '')
        throw new Error('Provide valid cubic ID ...!');
    if (fieldsData.cubicName == null || typeof fieldsData.cubicName !== 'string' || fieldsData === '')
        throw new Error('Provide valid cubic name ...!');
    if (fieldsData.sectionName == null || typeof fieldsData.sectionName !== 'string' || fieldsData.sectionName === '')
        throw new Error('Provide valid section name ...!');
    if (fieldsData.folderName == null || typeof fieldsData.folderName !== 'string' || fieldsData.folderName === '')
        throw new Error('Provide valid folder name ...!');
    if (fieldsData.folderId == null || typeof fieldsData.folderId !== 'string' || fieldsData.folderId === '')
        throw new Error('Provide valid folder ID ...!');
}


/**
    ** Check upload singles folder objects, values and keys.
    * @param {object}  meta object with keys ... .
    * @param {object}  fieldname object with keys ... .
    * @param {object}  fileArray object with keys ... .
    * @return {string}  Throws an error if any of the values is missing or wrong type.
*/
const singleUploadCheckValues = (meta, fieldname, fileArray) => {
    if (meta == null || typeof meta !== 'object')
        throw new Error('Provide valid meta data object ...!');
    if (fieldname == null || typeof fieldname !== 'string' || fieldname === '')
        throw new Error('Provide valid file field name ...!');
    if (fileArray == null || typeof fileArray !== 'object')
        throw new Error('Provide valid array of files ...!');
}


/**
    ** Check upload folder objects, values and keys.
    * @param {object}  meta object with keys ... .
    * @param {object}  fieldname object with keys ... .
    * @param {object}  fileArray object with keys ... .
    * @return {string}  Throws an error if any of the values is missing or wrong type.
*/
const folderUploadCheckValues = (meta, fieldname, fileArray) => {
    if (meta == null || typeof meta !== 'object')
        throw new Error('Provide valid meta data object ...!');
    if (fieldname == null || typeof fieldname !== 'string')
        throw new Error('Provide valid file field name ...!');
    if (fileArray == null || typeof fileArray !== 'object')
        throw new Error('Provide valid array of files ...!');
}


/**
    ** Cubic by id value check.
    * @param {string}  cubicId id of the cubic you wish to access ... .
    * @return {string}  Throws an error if any of the values is missing or wrong type.
*/
const cubicByIdCheck = (cubicId) => {
    if (cubicId == null || typeof cubicId !== 'string' || cubicId === '')
        throw new Error('Provide valid cubic ID ...!');
}

const goodStatus = [200, 201, 301, 304];
/**
    ** axios http checker.
    * @param {object}  httpResponse object with keys ... .
    * @return {string}  Throws an error if any of the values is missing or wrong type.
*/
const checkHttpStatus = (httpResponse) => {
    if (!goodStatus.includes(httpResponse.status)) {
        throw new Error(httpResponse.statusText)
    } else {
        return;
    }
}

/**
    ** Check http error type.
    * @param {object}  error the error object to inspect .
    * @return {error}  Throws an error if any of the values is missing or wrong type.
*/
const checkHttpErrorType = (error) => {
    if (error.name === 'AbortError')
        throw new Error('Request timed out...!');
    else
        throw new Error(error.message);
}



// Exports
export {
    sortSectionName,
    checkResStatus,
    checkCubicInitValues,
    checkDelObjectValues,
    checkCubicSingleValues,
    checkGetFolderValues,
    checkCreateFolderValues,
    checkDeleteFolderValues,
    singleUploadCheckValues,
    folderUploadCheckValues,
    cubicByIdCheck,
    checkHttpStatus,
    checkHttpErrorType
};