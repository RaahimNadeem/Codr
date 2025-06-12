// PDF generation service for LaTeX compilation
export class PDFService {
  
  // Using LaTeX Online API for compilation
  static async compileLatexToPDF(latexCode, fileName = 'resume') {
    try {
      // We'll use LaTeX.Online API which is free and doesn't require authentication
      const response = await fetch('https://latex.ytotech.com/builds/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          compiler: 'pdflatex',
          resources: [
            {
              main: true,
              file: `${fileName}.tex`,
              content: latexCode
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`LaTeX compilation failed: ${response.status}`);
      }

      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('LaTeX compilation error:', error);
      throw new Error('Failed to compile LaTeX to PDF. Please try again or use the LaTeX code manually.');
    }
  }

  // Alternative method using LaTeX Base API
  static async compileLatexToPDFAlternative(latexCode, fileName = 'resume') {
    try {
      const formData = new FormData();
      formData.append('filecontents[]', latexCode);
      formData.append('filename[]', `${fileName}.tex`);
      formData.append('engine', 'pdflatex');
      formData.append('return', 'pdf');

      const response = await fetch('https://latexbase.com/api/v1/compile', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`LaTeX compilation failed: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 'success') {
        // Download the PDF from the provided URL
        const pdfResponse = await fetch(result.pdf_url);
        const blob = await pdfResponse.blob();
        return blob;
      } else {
        throw new Error(result.error || 'LaTeX compilation failed');
      }
    } catch (error) {
      console.error('LaTeX compilation error:', error);
      throw new Error('Failed to compile LaTeX to PDF. Please try again or use the LaTeX code manually.');
    }
  }

  // Fallback method using a simple LaTeX to PDF service
  static async compileLatexToPDFSimple(latexCode, fileName = 'resume') {
    try {
      // Using a simple POST request to LaTeX.Online
      const response = await fetch('https://latex.ytotech.com/builds/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-latex',
        },
        body: latexCode
      });

      if (!response.ok) {
        throw new Error(`LaTeX compilation failed: ${response.status}`);
      }

      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Simple LaTeX compilation error:', error);
      
      // If all online methods fail, we'll create a simple PDF with basic formatting
      return this.createFallbackPDF(latexCode, fileName);
    }
  }

  // Create a fallback PDF using simple text formatting
  static async createFallbackPDF(latexCode, fileName) {
    try {
      // This will create a simple PDF with the LaTeX code as content
      // Users can still copy the LaTeX code and use it elsewhere
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(12);
      doc.text('Resume LaTeX Code', 20, 20);
      doc.setFontSize(8);
      doc.text('Copy this code and paste it into Overleaf.com to generate your resume:', 20, 35);
      
      // Add the LaTeX code (truncated to fit)
      const lines = latexCode.split('\n');
      let yPosition = 50;
      
      lines.forEach((line, index) => {
        if (yPosition > 280) { // If we're near the bottom of the page
          doc.addPage();
          yPosition = 20;
        }
        
        // Truncate long lines
        const truncatedLine = line.length > 90 ? line.substring(0, 87) + '...' : line;
        doc.text(truncatedLine, 10, yPosition);
        yPosition += 4;
      });
      
      return doc.output('blob');
    } catch (error) {
      console.error('Fallback PDF creation error:', error);
      throw new Error('Unable to generate PDF. Please copy the LaTeX code and use it with Overleaf.');
    }
  }

  // Main method that tries different compilation methods
  static async generatePDF(latexCode, fileName = 'resume') {
    const methods = [
      () => this.compileLatexToPDF(latexCode, fileName),
      () => this.compileLatexToPDFAlternative(latexCode, fileName),
      () => this.compileLatexToPDFSimple(latexCode, fileName),
      () => this.createFallbackPDF(latexCode, fileName)
    ];

    for (let i = 0; i < methods.length; i++) {
      try {
        console.log(`Trying PDF generation method ${i + 1}...`);
        const blob = await methods[i]();
        console.log(`PDF generation method ${i + 1} successful`);
        return blob;
      } catch (error) {
        console.log(`PDF generation method ${i + 1} failed:`, error.message);
        if (i === methods.length - 1) {
          throw error; // If all methods fail, throw the last error
        }
      }
    }
  }

  // Download blob as file
  static downloadBlob(blob, fileName = 'resume.pdf') {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
