// imports
import { create } from 'express-handlebars';
import { join } from 'node:path';
import pdf from 'html-pdf';
import Cubic from './modules/cubicAPIsExample/index.js';
import { stat } from 'node:fs/promises';
import * as url from 'url';
import dotenv from 'dotenv';



// Global Vars
import { obj, objFolder } from './utils/data.js';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const context = {
    name: "CALVIN HAYES",
    cellNo: "078 987 6543",
    landlineNo: "011 123 4567",
    email: "admin@randallinc.cp.za",
    date: new Date(Date.now()).toLocaleDateString(),
    accountInfo: {
        id: "CTT105689",
        vatNo: "",
        orderNo: "20230514852365889",
    },
    orderInfo: {
        invNo: "HTW2345896",
        salesPerson: "Langton",
        delMethod: "Collection",
        payMethod: "EFT",
        stock:{
            barcode: "111875692245",
            sCode: "CIH899876",
            description: "Teensy 3.0",
            qty: 1,
            unitPrice: 286.00,
            nettPrice: 250.00,
            vat: 36.10
        }
    },

};
const pdfConfig = {
    "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
    "orientation": "portrait", // portrait or landscape
}
const folderPath = 'docs'
let data1 = {
    originalFilename: `${Date.now()}-inv.pdf`,
    size: 0,
    filepath: '',
    mimetype: 'application/pdf',
    originalname: `${Date.now()}-inv.pdf`
}
const filePathValue = `./${folderPath}/${data1.originalFilename}`;



// initialisation
dotenv.config({ path: join(__dirname, 'config/config.env') }); // Env environment config.
const initCubic = new Cubic(process.env.cubicToken, process.env.cubicAppID);
const hbs = create({
    viewEngine: {
        partialsDir: join(process.cwd(), "/views/partials"),
        layoutsDir: join(process.cwd(), "/views/layouts"),
        extname: ".hbs"
    },
    extName: ".hbs",
    viewPath: join(process.cwd(), "/views")
});


// helpers
/**
    ** Compile HBS file to HTML.
    * @param {string}  template path to the template to be used.
    * @param {object}  templateData object with keys and values containing data for the template.
    * @return {object}  Returns nothing if process was successful.
*/
function getHtml (template, templateData) {
    return new Promise((resolve, reject) => {
        hbs.render(template, templateData)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}


/**
    ** Convert HTML file to PDF.
    * @param {string}  htmlContent html file contents.
    * @param {object}  fileName output pdf file name.
    * @return {file}  Returns new pdf file path.
*/
function htmlToPDFConverter (htmlContent, fileName) {
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, pdfConfig).toFile(fileName, (err, res) => {
            if (err) reject(new Error(err));
            resolve(res);
        })
    })
}


// fn
/**
    ** Upload PDF file to Cloud Cubic Vault.
    * @param {string}  fileName the name to give the pdf created.
    * @param {object}  templateData the object containing data to create dynamic html invoice.
    * @param {string}  pathToFolder were to temporarily store the created pdf.
    * @return {object}  Returns an object representing file info & more if file upload was successful.
*/
const pdfSaveTask = async (fileName, templateData, pathToFolder) => {
    try {
        // Create the invoice with dynamic html
        const html = await getHtml(join(process.cwd(), '/views/index.hbs'), templateData);

        // Convert dynamic html to PDF file.
        const { filename } = await htmlToPDFConverter(html, fileName);

        // Extract the created pdf metadata.
        const { size: fileSize } = await stat(join(__dirname, pathToFolder, data1.originalFilename));
        data1.size = fileSize;
        data1.filepath = filename;

        // Upload to singles documents folder in the Cubic
        //const savePdfToSingleFolder = await initCubic.uploadSingleSection(obj, 'eFile', [data1]);
        //return savePdfToSingleFolder;

        // Upload documents to specific folder in the Cubic
        const savePdfToFolder = await initCubic.uploadFolderSection(objFolder, 'eFile', [data1]);
        
        // Response
        return savePdfToFolder;
    } catch (error) {
        throw new Error(error)
    }
    // Clean ups
}


// Call Fn
pdfSaveTask(filePathValue, context, folderPath)
    .then(console.log).catch(console.error)
