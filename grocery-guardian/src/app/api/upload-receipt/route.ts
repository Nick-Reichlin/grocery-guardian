import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
//import { createWorker } from 'tesseract.js';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as File | null;

  if (!file) {
    return new NextResponse(JSON.stringify({ success: false, message: 'No file uploaded' }), { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Initialize tesseract.js worker
  //   const worker = createWorker();
  //   await worker.load();
  //   await worker.loadLanguage('eng');
  //   await worker.initialize('eng');

  //   // Recognize text from the PDF buffer
  //   const { data: { text } } = await worker.recognize(buffer);

  //   // Save the recognized text to a file (optional)
  //   const textFilePath = `/tmp/${file.name}.txt`;
  //   await writeFile(textFilePath, text);

  //   console.log(`Recognized text saved to: ${textFilePath}`);

  //   await worker.terminate();

  //   return new NextResponse(JSON.stringify({ success: true, recognizedText: text, textFilePath }), { status: 200 });
  // } catch (error) {
  //   console.error('Error processing file:', error);
  //   return new NextResponse(JSON.stringify({ success: false, message: 'Error processing file' }), { status: 500 });
  }
}
