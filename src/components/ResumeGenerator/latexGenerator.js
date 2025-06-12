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
    // Remove protocol if present for display
    const displayUrl = url.replace(/^https?:\/\//, '');
    return `\\href{https://${displayUrl.startsWith('www.') ? '' : 'www.'}${displayUrl}}{\\underline{${displayUrl}}}`;
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
      if (project.name && project.technologies && project.dates) {
        projectsContent += `
      \\resumeProjectHeading
          {\\textbf{${escapeLatex(project.name)}} $|$ \\emph{${escapeLatex(project.technologies)}}}{${escapeLatex(project.dates)}}`;

        if (project.description && project.description.length > 0) {
          const validDescriptions = project.description.filter(desc => desc.trim());
          if (validDescriptions.length > 0) {
            projectsContent += `
          \\resumeItemListStart`;
            
            validDescriptions.forEach(desc => {
              projectsContent += `
            \\resumeItem{${escapeLatex(desc.trim())}}`;
            });

            projectsContent += `
          \\resumeItemListEnd`;
          }
        }
      }
    });

    projectsContent += `
    \\resumeSubHeadingListEnd`;

    return projectsContent;
  };

  // Generate skills section
  const generateSkills = () => {
    const { languages, frameworks, developerTools, libraries } = skills;
    
    if (!languages && !frameworks && !developerTools && !libraries) return '';

    let skillsContent = `

%-----------PROGRAMMING SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{`;

    const skillItems = [];
    
    if (languages) {
      skillItems.push(`\\textbf{Languages}{: ${escapeLatex(languages)}}`);
    }
    
    if (frameworks) {
      skillItems.push(`\\textbf{Frameworks}{: ${escapeLatex(frameworks)}}`);
    }
    
    if (developerTools) {
      skillItems.push(`\\textbf{Developer Tools}{: ${escapeLatex(developerTools)}}`);
    }
    
    if (libraries) {
      skillItems.push(`\\textbf{Libraries}{: ${escapeLatex(libraries)}}`);
    }

    skillsContent += `
     ${skillItems.join(' \\\\\n     ')}
    }}
 \\end{itemize}`;

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
${generateHeader()}${generateEducation()}${generateExperience()}${generateProjects()}${generateSkills()}


%-------------------------------------------
\\end{document}`;

  return latexDocument;
};
