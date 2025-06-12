// ATS-focused analysis for Pakistani job market
export const performATSAnalysis = (textOrData, metadata = {}) => {
  // Handle both old format (just text) and new format (object with text and metadata)
  let text, actualMetadata;
  
  if (typeof textOrData === 'string') {
    text = textOrData;
    actualMetadata = metadata;
  } else {
    text = textOrData.text || textOrData;
    actualMetadata = textOrData.metadata || metadata;
  }
  
  console.log('Starting ATS analysis with text length:', text.length);
  
  const analysis = {
    overallScore: 0,
    maxScore: 100,
    sections: {},
    formatting: {},
    keywords: {},
    atsCompatibility: {},
    recommendations: [],
    metadata: actualMetadata
  };

  // Run all analysis functions
  analysis.sections = checkEssentialSections(text);
  analysis.formatting = checkATSFormatting(text, actualMetadata);
  analysis.keywords = analyzeKeywordsAndSkills(text);
  analysis.atsCompatibility = checkATSCompatibility(text, actualMetadata);
  
  // Calculate overall score
  analysis.overallScore = 
    analysis.sections.score + 
    analysis.formatting.score + 
    analysis.keywords.score + 
    analysis.atsCompatibility.score;

  // Generate recommendations
  analysis.recommendations = generateRecommendations(analysis);

  return analysis;
};

const checkEssentialSections = (text) => {
  const textLower = text.toLowerCase();
  
  const sections = [
    {
      name: 'Contact Information',
      keywords: ['email', '@', 'phone', 'linkedin', 'github', 'portfolio'],
      weight: 15,
      required: true,
      description: 'Email, phone, and professional profiles'
    },
    {
      name: 'Professional Summary/Objective',
      keywords: ['summary', 'objective', 'profile', 'about', 'overview'],
      weight: 10,
      required: false,
      description: 'Brief professional summary or career objective'
    },
    {
      name: 'Work Experience',
      keywords: ['experience', 'work', 'employment', 'intern', 'job', 'position', 'role'],
      weight: 25,
      required: true,
      description: 'Professional work experience and internships'
    },
    {
      name: 'Education',
      keywords: ['education', 'university', 'degree', 'bachelor', 'master', 'college', 'cgpa', 'gpa'],
      weight: 15,
      required: true,
      description: 'Educational background and qualifications'
    },
    {
      name: 'Technical Skills',
      keywords: ['skills', 'technologies', 'programming', 'languages', 'frameworks', 'tools'],
      weight: 20,
      required: true,
      description: 'Technical skills and programming languages'
    },
    {
      name: 'Projects',
      keywords: ['projects', 'portfolio', 'developed', 'built', 'created', 'github'],
      weight: 10,
      required: false,
      description: 'Personal or academic projects'
    },
    {
      name: 'Certifications',
      keywords: ['certification', 'certified', 'certificate', 'course', 'training'],
      weight: 5,
      required: false,
      description: 'Professional certifications and courses'
    }
  ];

  let totalScore = 0;
  const sectionResults = {};
  const missingSections = [];

  sections.forEach(section => {
    const hasSection = section.keywords.some(keyword => 
      textLower.includes(keyword)
    );
    
    sectionResults[section.name] = {
      found: hasSection,
      weight: section.weight,
      required: section.required,
      description: section.description
    };
    
    if (hasSection) {
      totalScore += section.weight;
    } else if (section.required) {
      missingSections.push(section.name);
    }
  });

  return {
    score: totalScore,
    maxScore: 80,
    sections: sectionResults,
    missingSections,
    analysis: `Found ${Object.values(sectionResults).filter(s => s.found).length} out of ${sections.length} sections`
  };
};

const checkATSFormatting = (text, metadata) => {
  let score = 0;
  const issues = [];
  const warnings = [];
  
  // Check text length (too short indicates parsing issues)
  if (text.length < 500) {
    issues.push('Resume appears too short - this might indicate parsing issues with complex formatting');
  } else if (text.length < 1000) {
    warnings.push('Resume content seems brief - consider adding more details about your experience');
    score += 3;
  } else {
    score += 5;
  }

  // Check for bullet points
  const bulletPattern = /[•\-\*\►\‣]/g;
  const bulletMatches = text.match(bulletPattern);
  if (bulletMatches && bulletMatches.length >= 5) {
    score += 5;
  } else {
    issues.push('Use bullet points to improve readability and ATS parsing');
  }

  // Check for dates (experience and education dates)
  const datePattern = /\b(19|20)\d{2}\b|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(19|20)?\d{2}\b|\b\d{1,2}\/\d{2,4}\b/gi;
  const dateMatches = text.match(datePattern);
  if (dateMatches && dateMatches.length >= 3) {
    score += 5;
  } else {
    issues.push('Include clear dates for your experience and education (Month/Year format recommended)');
  }

  // Check for quantifiable achievements
  const numberPattern = /\b\d+([.,]\d+)?(%|k|K|million|thousand|users|projects|team|members|increase|decrease|improve|reduce)\b/g;
  const quantifiableMatches = text.match(numberPattern);
  if (quantifiableMatches && quantifiableMatches.length >= 2) {
    score += 5;
  } else {
    warnings.push('Add quantifiable achievements (e.g., "Improved performance by 30%", "Led team of 5 developers")');
  }

  // Check for action verbs
  const actionVerbs = [
    'developed', 'created', 'built', 'designed', 'implemented', 'managed', 'led', 'improved',
    'optimized', 'automated', 'integrated', 'collaborated', 'achieved', 'delivered', 'maintained'
  ];
  const actionVerbCount = actionVerbs.filter(verb => 
    text.toLowerCase().includes(verb)
  ).length;
  
  if (actionVerbCount >= 5) {
    score += 5;
  } else {
    warnings.push('Use more action verbs to describe your accomplishments (developed, created, implemented, etc.)');
  }

  // Check for complex formatting that might cause ATS issues
  if (metadata.hasComplexFormatting) {
    warnings.push('Complex formatting detected - consider using a simpler layout for better ATS compatibility');
  } else {
    score += 3;
  }

  // Check for potential images/graphics
  if (metadata.hasImages) {
    issues.push('Potential graphics or images detected - ATS systems cannot read visual elements');
  } else {
    score += 2;
  }

  return {
    score,
    maxScore: 25,
    issues,
    warnings,
    analysis: `Formatting score: ${score}/25. ${issues.length} issues and ${warnings.length} warnings found.`
  };
};

const analyzeKeywordsAndSkills = (text) => {
  const textLower = text.toLowerCase();
  
  // Technical skills relevant to Pakistani tech market
  const technicalSkills = {
    'Programming Languages': [
      'javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'swift', 'kotlin',
      'typescript', 'dart', 'scala', 'r', 'matlab'
    ],
    'Web Technologies': [
      'react', 'angular', 'vue', 'nodejs', 'express', 'django', 'flask', 'laravel',
      'html', 'css', 'sass', 'bootstrap', 'tailwind', 'jquery'
    ],
    'Mobile Development': [
      'android', 'ios', 'flutter', 'react native', 'xamarin', 'ionic'
    ],
    'Databases': [
      'mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 'oracle', 'sql server',
      'firebase', 'dynamodb', 'cassandra'
    ],
    'Cloud & DevOps': [
      'aws', 'azure', 'google cloud', 'docker', 'kubernetes', 'jenkins', 'git',
      'gitlab', 'github', 'ci/cd', 'terraform', 'ansible'
    ],
    'Data Science & AI': [
      'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'pandas',
      'numpy', 'scikit-learn', 'opencv', 'nlp', 'computer vision'
    ],
    'Testing & Quality': [
      'unit testing', 'integration testing', 'selenium', 'jest', 'cypress',
      'postman', 'jira', 'agile', 'scrum'
    ]
  };

  // Soft skills important in Pakistani corporate culture
  const softSkills = [
    'teamwork', 'leadership', 'communication', 'problem solving', 'analytical',
    'creative', 'adaptable', 'detail oriented', 'time management', 'collaborative'
  ];

  const foundSkills = {};
  let totalSkillsFound = 0;
  
  // Analyze technical skills by category
  Object.entries(technicalSkills).forEach(([category, skills]) => {
    const categorySkills = skills.filter(skill => textLower.includes(skill));
    foundSkills[category] = categorySkills;
    totalSkillsFound += categorySkills.length;
  });

  // Analyze soft skills
  const foundSoftSkills = softSkills.filter(skill => textLower.includes(skill));
  foundSkills['Soft Skills'] = foundSoftSkills;

  // Industry-specific keywords for Pakistani market
  const industryKeywords = [
    'fintech', 'ecommerce', 'healthcare', 'education', 'logistics', 'retail',
    'banking', 'telecommunications', 'startup', 'enterprise'
  ];
  
  const foundIndustryKeywords = industryKeywords.filter(keyword => 
    textLower.includes(keyword)
  );

  // Calculate score based on skill diversity and quantity
  let score = Math.min(totalSkillsFound, 15); // Max 15 points for technical skills
  
  if (foundSoftSkills.length >= 3) score += 3;
  if (foundIndustryKeywords.length >= 1) score += 2;

  const recommendations = [];
  
  if (totalSkillsFound < 8) {
    recommendations.push('Add more relevant technical skills to improve ATS keyword matching');
  }
  
  if (foundSoftSkills.length < 3) {
    recommendations.push('Include soft skills like "teamwork", "leadership", and "communication"');
  }

  // Check for trending technologies in Pakistani market
  const trendingTech = ['react', 'nodejs', 'python', 'aws', 'docker', 'mongodb'];
  const foundTrending = trendingTech.filter(tech => textLower.includes(tech));
  
  if (foundTrending.length >= 3) {
    score += 2;
  } else {
    recommendations.push('Consider adding trending technologies like React, Node.js, Python, or AWS');
  }

  return {
    score,
    maxScore: 20,
    foundSkills,
    foundSoftSkills,
    foundIndustryKeywords,
    totalSkillsFound,
    recommendations,
    analysis: `Found ${totalSkillsFound} technical skills across ${Object.keys(foundSkills).length} categories`
  };
};

const checkATSCompatibility = (text, metadata) => {
  let score = 0;
  const compatibilityIssues = [];
  const compatibilityWarnings = [];

  // Length check (ATS systems prefer comprehensive but not overly long resumes)
  const wordCount = text.split(/\s+/).length;
  if (wordCount < 200) {
    compatibilityIssues.push('Resume is too short - ATS systems may flag as incomplete');
  } else if (wordCount < 400) {
    compatibilityWarnings.push('Resume could be more detailed for better ATS scoring');
    score += 2;
  } else if (wordCount <= 800) {
    score += 5; // Optimal length
  } else if (wordCount <= 1200) {
    score += 3;
    compatibilityWarnings.push('Resume is quite long - consider condensing for better ATS processing');
  } else {
    compatibilityIssues.push('Resume is too long - ATS systems may not process all content');
  }

  // Check for special characters that might cause parsing issues
  const problematicChars = /[^\w\s\.\,\;\:\!\?\-\(\)\[\]\/\@\#\$\%\&\*\+\=]/g;
  const specialCharMatches = text.match(problematicChars);
  if (!specialCharMatches || specialCharMatches.length < 10) {
    score += 3;
  } else {
    compatibilityWarnings.push('Minimize special characters that might cause ATS parsing issues');
  }

  // Check for consistent formatting indicators
  const consistentFormatting = checkFormattingConsistency(text);
  if (consistentFormatting.isConsistent) {
    score += 3;
  } else {
    compatibilityIssues.push(...consistentFormatting.issues);
  }

  // Check for standard section headers
  const standardHeaders = [
    'experience', 'education', 'skills', 'summary', 'objective', 'projects',
    'work experience', 'professional experience', 'technical skills'
  ];
  
  const foundHeaders = standardHeaders.filter(header => 
    text.toLowerCase().includes(header)
  ).length;
  
  if (foundHeaders >= 4) {
    score += 4;
  } else {
    compatibilityWarnings.push('Use standard section headers for better ATS recognition');
  }

  // Check for contact information format
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phonePattern = /(\+92|0)?[\s-]?[0-9]{3}[\s-]?[0-9]{7}|\(\d{3}\)[\s-]?\d{3}[\s-]?\d{4}/;
  
  if (emailPattern.test(text)) score += 2;
  if (phonePattern.test(text)) score += 1;

  return {
    score,
    maxScore: 15,
    compatibilityIssues,
    compatibilityWarnings,
    wordCount,
    analysis: `ATS Compatibility: ${compatibilityIssues.length} critical issues, ${compatibilityWarnings.length} warnings`
  };
};

const checkFormattingConsistency = (text) => {
  const issues = [];
  let isConsistent = true;

  // Check for consistent date formats
  const dateFormats = [
    /\b(19|20)\d{2}\b/g,                    // 2023
    /\b\d{1,2}\/\d{2,4}\b/g,               // 1/2023 or 01/23
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(19|20)?\d{2}\b/gi  // Jan 2023
  ];

  const formatCounts = dateFormats.map(pattern => 
    (text.match(pattern) || []).length
  );

  const totalDates = formatCounts.reduce((sum, count) => sum + count, 0);
  const maxFormat = Math.max(...formatCounts);

  if (totalDates > 0 && maxFormat / totalDates < 0.7) {
    issues.push('Use consistent date formatting throughout your resume');
    isConsistent = false;
  }

  return { isConsistent, issues };
};

const generateRecommendations = (analysis) => {
  const recommendations = [];
  
  // Critical recommendations (must fix)
  if (analysis.sections.missingSections.length > 0) {
    recommendations.push({
      type: 'critical',
      title: 'Add Missing Essential Sections',
      description: `Include these required sections: ${analysis.sections.missingSections.join(', ')}`,
      impact: 'high'
    });
  }

  if (analysis.formatting.issues.length > 0) {
    analysis.formatting.issues.forEach(issue => {
      recommendations.push({
        type: 'critical',
        title: 'Fix Formatting Issue',
        description: issue,
        impact: 'high'
      });
    });
  }

  if (analysis.atsCompatibility.compatibilityIssues.length > 0) {
    analysis.atsCompatibility.compatibilityIssues.forEach(issue => {
      recommendations.push({
        type: 'critical',
        title: 'ATS Compatibility Issue',
        description: issue,
        impact: 'high'
      });
    });
  }

  // Important recommendations (should fix)
  if (analysis.keywords.totalSkillsFound < 8) {
    recommendations.push({
      type: 'important',
      title: 'Enhance Technical Skills Section',
      description: 'Add more relevant technical skills to improve keyword matching with job descriptions',
      impact: 'medium'
    });
  }

  if (analysis.formatting.warnings.length > 0) {
    analysis.formatting.warnings.forEach(warning => {
      recommendations.push({
        type: 'important',
        title: 'Improve Formatting',
        description: warning,
        impact: 'medium'
      });
    });
  }

  // Suggestions (nice to have)
  if (analysis.keywords.foundSoftSkills.length < 3) {
    recommendations.push({
      type: 'suggestion',
      title: 'Add Soft Skills',
      description: 'Include soft skills like teamwork, leadership, and communication',
      impact: 'low'
    });
  }

  if (analysis.overallScore >= 80) {
    recommendations.push({
      type: 'positive',
      title: 'Excellent ATS Compatibility!',
      description: 'Your resume shows strong ATS compatibility. Consider minor optimizations for perfection.',
      impact: 'positive'
    });
  } else if (analysis.overallScore >= 60) {
    recommendations.push({
      type: 'suggestion',
      title: 'Good Foundation',
      description: 'Your resume has a solid foundation. Focus on the critical issues to improve your ATS score.',
      impact: 'medium'
    });
  }

  return recommendations;
};
