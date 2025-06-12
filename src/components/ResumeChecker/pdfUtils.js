import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Set worker source for PDF.js - use a more reliable CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

export const extractTextFromPDF = async (file) => {
  try {
    console.log('Starting PDF extraction for file:', file.name, 'Size:', file.size);
    
    const arrayBuffer = await file.arrayBuffer();
    console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);
    
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      cMapUrl: 'https://unpkg.com/pdfjs-dist@' + pdfjsLib.version + '/cmaps/',
      cMapPacked: true,
    });
    
    const pdf = await loadingTask.promise;
    console.log('PDF loaded successfully, pages:', pdf.numPages);
    
    let fullText = '';
    let metadata = {
      numPages: pdf.numPages,
      hasImages: false,
      hasComplexFormatting: false
    };

    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`Processing page ${i}/${pdf.numPages}`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Check for complex formatting (tables, multi-column layouts)
      const items = textContent.items;
      let yPositions = new Set();
      
      items.forEach(item => {
        if (item.transform) {
          yPositions.add(Math.round(item.transform[5]));
        }
      });
      
      // If we have many different Y positions on a page, it might indicate complex formatting
      if (yPositions.size > 50) {
        metadata.hasComplexFormatting = true;
      }
      
      const pageText = items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
      console.log(`Page ${i} extracted ${pageText.length} characters`);
      
      // Check for potential images (empty spaces might indicate graphics)
      const viewport = page.getViewport({ scale: 1.0 });
      if (viewport.width > 0 && viewport.height > 0 && pageText.trim().length < 100) {
        metadata.hasImages = true;
      }
    }

    // Clean up the text
    fullText = fullText
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();

    console.log('Final extracted text length:', fullText.length);
    
    if (fullText.length < 50) {
      throw new Error('Extracted text is too short. This might be a scanned PDF or contain mostly images.');
    }

    return { text: fullText, metadata };
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    
    // Provide more specific error messages
    if (error.message.includes('Invalid PDF')) {
      throw new Error('Invalid PDF file. Please ensure the file is not corrupted.');
    } else if (error.message.includes('too short')) {
      throw new Error('This PDF appears to contain mostly images or scanned text. Please use a PDF with selectable text.');
    } else if (error.message.includes('Password')) {
      throw new Error('This PDF is password protected. Please use an unprotected PDF file.');
    } else {
      throw new Error('Failed to read PDF file. Please ensure it\'s a valid PDF with readable text.');
    }
  }
};

// Fallback extraction method with simpler configuration
export const extractTextFromPDFSimple = async (file) => {
  try {
    console.log('Trying simple PDF extraction method...');
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + ' ';
    }

    // Basic cleanup
    fullText = fullText.replace(/\s+/g, ' ').trim();
    
    if (fullText.length < 20) {
      throw new Error('Very little text extracted from PDF');
    }

    return {
      text: fullText,
      metadata: {
        numPages: pdf.numPages,
        hasImages: false,
        hasComplexFormatting: false,
        extractionMethod: 'simple'
      }
    };
  } catch (error) {
    console.error('Simple extraction also failed:', error);
    throw error;
  }
};

// Enhanced extraction with retry logic
export const extractTextFromPDFWithRetry = async (file) => {
  try {
    // Try the advanced method first
    return await extractTextFromPDF(file);
  } catch (error) {
    console.log('Advanced extraction failed, trying simple method...');
    try {
      return await extractTextFromPDFSimple(file);
    } catch (simpleError) {
      console.error('Both extraction methods failed');
      throw new Error('Unable to extract text from this PDF. It may be a scanned document, password-protected, or corrupted.');
    }
  }
};
