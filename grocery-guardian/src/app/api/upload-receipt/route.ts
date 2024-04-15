import pdfParse from "pdf-parse";
import fs from 'fs';

export default async function parse() {
    const pdffile = fs.readFileSync('./example.pdf');
    const data = await pdfParse(pdffile);

    console.log('Hello');
    console.log(data.numpages);
}
