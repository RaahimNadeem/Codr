// LaTeX code generator for Jake's Resume Template
export const generateLatexCode = (resumeData) => {
  const { personalInfo, education, experience, projects, skills } = resumeData;

  // Helper function to escape LaTeX special characters
  const escapeLatex = (text) => {
    if (!text) return '';
    return text
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\$/g, '\\$')
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/#/g, '\\#')
      .replace(/\^/g, '\\textasciicircum{}')
      .replace(/_/g, '\\_')
      .replace(/~/g, '\\textasciitilde{}');
  };

  // Helper function to format URLs
  const formatUrl = (url) => {
    if (!url) return '';
    let href = url.trim();
    // Add https:// if not present
    if (!/^https?:\/\//i.test(href)) {
      href = 'https://' + href;
    }
    // Display text: remove protocol for cleaner look
    const displayUrl = href.replace(/^https?:\/\//i, '');
    return `\\href{${href}}{\\underline{${escapeLatex(displayUrl)}}}`;
  };

  // Generate header section
  const generateHeader = () => {
    const { name, phone, email, linkedin, github, website } = personalInfo;
    
    let headerContent = `\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(name)}} \\\\ \\vspace{1pt}
    \\small ${escapeLatex(phone)}`;

    if (email) {
      headerContent += ` $|$ \\href{mailto:${email}}{\\underline{${email}}}`;
    }

    if (linkedin) {
      headerContent += ` $|$ ${formatUrl(linkedin)}`;
    }

    if (github) {
      headerContent += ` $|$ ${formatUrl(github)}`;
    }

    if (website) {
      headerContent += ` $|$ ${formatUrl(website)}`;
    }

    headerContent += `
\\end{center}`;

    return headerContent;
  };

  // Generate education section
  const generateEducation = () => {
    if (!education || education.length === 0) return '';

    let educationContent = `

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart`;

    education.forEach(edu => {
      if (edu.institution && edu.location && edu.degree && edu.dates) {
        let degreeText = escapeLatex(edu.degree);
        
        // Add GPA and honors if provided
        const additionalInfo = [];
        if (edu.gpa) additionalInfo.push(`GPA: ${escapeLatex(edu.gpa)}`);
        if (edu.honors) additionalInfo.push(escapeLatex(edu.honors));
        
        if (additionalInfo.length > 0) {
          degreeText += `, ${additionalInfo.join(', ')}`;
        }

        educationContent += `
    \\resumeSubheading
      {${escapeLatex(edu.institution)}}{${escapeLatex(edu.location)}}
      {${degreeText}}{${escapeLatex(edu.dates)}}`;
      }
    });

    educationContent += `
  \\resumeSubHeadingListEnd`;

    return educationContent;
  };

  // Generate experience section
  const generateExperience = () => {
    if (!experience || experience.length === 0) return '';
    
    // Check if any experience has actual content
    const hasValidExperience = experience.some(exp => 
      exp.title?.trim() || exp.company?.trim() || exp.location?.trim() || exp.dates?.trim()
    );
    
    if (!hasValidExperience) return '';

    let experienceContent = `

%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart`;

    experience.forEach(exp => {
      if (exp.title && exp.company && exp.location && exp.dates) {
        experienceContent += `

    \\resumeSubheading
      {${escapeLatex(exp.title)}}{${escapeLatex(exp.dates)}}
      {${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}`;

        if (exp.responsibilities && exp.responsibilities.length > 0) {
          const validResponsibilities = exp.responsibilities.filter(resp => resp.trim());
          if (validResponsibilities.length > 0) {
            experienceContent += `
      \\resumeItemListStart`;
            
            validResponsibilities.forEach(resp => {
              experienceContent += `
        \\resumeItem{${escapeLatex(resp.trim())}}`;
            });

            experienceContent += `
      \\resumeItemListEnd`;
          }
        }
      }
    });

    experienceContent += `

  \\resumeSubHeadingListEnd`;

    return experienceContent;
  };

  // Generate projects section
  const generateProjects = () => {
    if (!projects || projects.length === 0) return '';
    
    // Check if any project has actual content
    const hasValidProjects = projects.some(project => 
      project.name?.trim() || project.technologies?.trim() || project.dates?.trim()
    );
    
    if (!hasValidProjects) return '';

    let projectsContent = `

%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart`;

    projects.forEach(project => {
      if (project.name) {
        let heading = `\\textbf{${escapeLatex(project.name)}}`;
        if (project.technologies) heading += ` $|$ \\emph{${escapeLatex(project.technologies)}}`;
        projectsContent += `\n      \\resumeProjectHeading
          {${heading}}{${escapeLatex(project.dates || '')}}`;
        if (project.description && project.description.length > 0) {
          const validDescriptions = project.description.filter(desc => desc.trim());
          if (validDescriptions.length > 0) {
            projectsContent += `\n          \\resumeItemListStart`;
            validDescriptions.forEach(desc => {
              projectsContent += `\n            \\resumeItem{${escapeLatex(desc.trim())}}`;
            });
            projectsContent += `\n          \\resumeItemListEnd`;
          }
        }
      }
    });

    projectsContent += `
    \\resumeSubHeadingListEnd`;

    return projectsContent;
  };

  // Generate certifications section
  const generateCertifications = () => {
    const { certifications } = resumeData;
    if (!certifications || certifications.length === 0) return '';
    // Check if any certification has actual content
    const hasValidCert = certifications.some(cert => cert.name?.trim() || cert.issuer?.trim() || cert.date?.trim() || cert.credentialId?.trim());
    if (!hasValidCert) return '';
    let certContent = `\n\n%-----------CERTIFICATIONS-----------\n\\section{Certifications}\n  \\resumeSubHeadingListStart`;
    certifications.forEach(cert => {
      if (cert.name && cert.issuer && cert.date) {
        let certLine = `\\textbf{${escapeLatex(cert.name)}}`;
        certLine += ` $|$ ${escapeLatex(cert.issuer)}`;
        certLine += ` $|$ ${escapeLatex(cert.date)}`;
        if (cert.credentialId) {
          certLine += ` $|$ Credential ID: ${escapeLatex(cert.credentialId)}`;
        }
        certContent += `\n    \\resumeSubItem{${certLine}}`;
      }
    });
    certContent += `\n  \\resumeSubHeadingListEnd`;
    return certContent;
  };

  // Generate skills section
  const generateSkills = () => {
    const { languages, frameworks, developerTools, libraries, softSkills, languages_spoken } = skills;
    
    if (!languages && !frameworks && !developerTools && !libraries && !softSkills && !languages_spoken) return '';

    // Helper to sanitize skill strings: remove newlines and trim spaces
    const sanitize = (str) => str ? str.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim() : '';

    let skillsContent = `\n\n%-----------SKILLS-----------\n\\section{Skills}\n \\begin{itemize}[leftmargin=0.15in, label={}]\n `;

    // Output each skill category as its own list item
    if (languages) {
      skillsContent += `\n    \\item \\small{\\textbf{Programming Languages:} ${escapeLatex(languages)}}`;
    }
    if (frameworks) {
      skillsContent += `\n    \\item \\small{\\textbf{Frameworks \\& Technologies:} ${escapeLatex(frameworks)}}`;
    }
    if (developerTools) {
      skillsContent += `\n    \\item \\small{\\textbf{Tools \\& Software:} ${escapeLatex(developerTools)}}`;
    }
    if (libraries) {
      skillsContent += `\n    \\item \\small{\\textbf{Libraries \\& Databases:} ${escapeLatex(libraries)}}`;
    }
    if (softSkills) {
      skillsContent += `\n    \\item \\small{\\textbf{Soft Skills:} ${escapeLatex(softSkills)}}`;
    }
    if (languages_spoken) {
      skillsContent += `\n    \\item \\small{\\textbf{Languages:} ${escapeLatex(languages_spoken)}}`;
    }
    skillsContent += '\n \\end{itemize}';
    return skillsContent;
  };

  // Generate complete LaTeX document
  const latexDocument = `%-------------------------
% Resume in Latex
% Author : ${personalInfo.name || 'Your Name'}
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
${generateHeader()}${generateEducation()}${generateExperience()}${generateProjects()}${generateSkills()}${generateCertifications()}


%-------------------------------------------
\\end{document}`;

  return latexDocument;
};
