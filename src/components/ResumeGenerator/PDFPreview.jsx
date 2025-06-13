import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontSize: 11,
    fontFamily: 'Times-Roman',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subsection: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  dates: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  location: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 15,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  skillList: {
    fontSize: 10,
    marginBottom: 5,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

const PDFPreview = ({ resumeData }) => {
  // Add defensive checks to prevent errors
  if (!resumeData) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.name}>Resume Preview Error</Text>
            <Text style={styles.contactInfo}>Resume data is not available</Text>
          </View>
        </Page>
      </Document>
    );
  }

  const {
    personalInfo = {},
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = []
  } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo?.name || 'Your Name'}</Text>
          <Text style={styles.contactInfo}>
            {personalInfo?.phone && personalInfo?.email 
              ? `${personalInfo.phone} | ${personalInfo.email}`
              : personalInfo?.phone || personalInfo?.email || 'Contact Information'}
          </Text>
          {(personalInfo?.linkedin || personalInfo?.github || personalInfo?.website) && (
            <Text style={styles.contactInfo}>
              {[personalInfo.linkedin, personalInfo.github, personalInfo.website]
                .filter(Boolean)
                .map(url => url?.replace(/^https?:\/\//, '') || url)
                .join(' | ')}
            </Text>
          )}
        </View>

        {/* Education */}
        {education && education.length > 0 && education.some(edu => edu?.institution) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.filter(edu => edu?.institution).map((edu, index) => (
              <View key={index} style={styles.subsection}>
                <View style={styles.row}>
                  <Text style={styles.jobTitle}>{edu.institution || ''}</Text>
                  <Text style={styles.dates}>{edu.location || ''}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.company}>
                    {edu.degree || ''}
                    {edu.gpa && `, GPA: ${edu.gpa}`}
                    {edu.honors && `, ${edu.honors}`}
                  </Text>
                  <Text style={styles.location}>{edu.dates || ''}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && experience.some(exp => exp?.title && exp?.company) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.filter(exp => exp?.title && exp?.company).map((exp, index) => (
              <View key={index} style={styles.subsection}>
                <View style={styles.row}>
                  <Text style={styles.jobTitle}>{exp.title || ''}</Text>
                  <Text style={styles.dates}>{exp.dates || ''}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.company}>{exp.company || ''}</Text>
                  <Text style={styles.location}>{exp.location || ''}</Text>
                </View>
                {exp.responsibilities && Array.isArray(exp.responsibilities) && 
                 exp.responsibilities.filter(resp => resp && resp.trim()).map((resp, respIndex) => (
                  <Text key={respIndex} style={styles.bulletPoint}>
                    • {resp.trim()}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && projects.some(proj => proj?.name) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.filter(project => project?.name).map((project, index) => (
              <View key={index} style={styles.subsection}>
                <View style={styles.row}>
                  <Text style={styles.jobTitle}>
                    {project.name || ''} {project.technologies && `| ${project.technologies}`}
                  </Text>
                  <Text style={styles.dates}>{project.dates || ''}</Text>
                </View>
                {project.description && Array.isArray(project.description) && 
                 project.description.filter(desc => desc && desc.trim()).map((desc, descIndex) => (
                  <Text key={descIndex} style={styles.bulletPoint}>
                    • {desc.trim()}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills && (skills?.languages || skills?.frameworks || skills?.developerTools || skills?.libraries || skills?.softSkills || skills?.languages_spoken) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.languages && (
              <View style={styles.subsection}>
                <Text style={styles.skillCategory}>Programming Languages: </Text>
                <Text style={styles.skillList}>{skills.languages}</Text>
              </View>
            )}
            {skills.frameworks && (
              <View style={styles.subsection}>
                <Text style={styles.skillCategory}>Frameworks & Technologies: </Text>
                <Text style={styles.skillList}>{skills.frameworks}</Text>
              </View>
            )}
            {skills.developerTools && (
              <View style={styles.subsection}>
                <Text style={styles.skillCategory}>Tools & Software: </Text>
                <Text style={styles.skillList}>{skills.developerTools}</Text>
              </View>
            )}
            {skills.libraries && (
              <View style={styles.subsection}>
                <Text style={styles.skillCategory}>Libraries & Databases: </Text>
                <Text style={styles.skillList}>{skills.libraries}</Text>
              </View>
            )}
            {skills.softSkills && (
              <View style={styles.subsection}>
                <Text style={styles.skillCategory}>Soft Skills: </Text>
                <Text style={styles.skillList}>{skills.softSkills}</Text>
              </View>
            )}
            {skills.languages_spoken && (
              <View style={styles.subsection}>
                <Text style={styles.skillCategory}>Languages: </Text>
                <Text style={styles.skillList}>{skills.languages_spoken}</Text>
              </View>
            )}
          </View>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && certifications.some(cert => cert?.name || cert?.issuer) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.filter(cert => cert?.name || cert?.issuer).map((cert, index) => (
              <View key={index} style={styles.subsection}>
                <View style={styles.row}>
                  <Text style={styles.jobTitle}>{cert.name || ''}</Text>
                  <Text style={styles.dates}>{cert.date || ''}</Text>
                </View>
                <Text style={styles.company}>{cert.issuer || ''}</Text>
                {cert.credentialId && (
                  <Text style={styles.responsibility}>Credential ID: {cert.credentialId}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFPreview;
