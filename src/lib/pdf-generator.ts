import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Registrar fontes
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: '2 solid #3B82F6',
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1F2937',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#3B82F6',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#1F2937',
    marginBottom: 3,
  },
  company: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 5,
  },
  description: {
    fontSize: 9,
    color: '#4B5563',
    lineHeight: 1.4,
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
  },
});

interface ResumeData {
  personalData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    photo?: string;
  };
  presentation: string;
  experience: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    degree: string;
    field: string;
    institution: string;
    endDate: string;
    current: boolean;
  }>;
  skills: string[];
  languages?: Array<{
    language: string;
    level: string;
  }>;
  certifications?: Array<{
    name: string;
    institution: string;
    year: string;
  }>;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${months[parseInt(month) - 1]}/${year}`;
};

export const generateResumePDF = (data: ResumeData) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalData.name}</Text>
          {data.personalData.email && (
            <Text style={styles.contactInfo}>{data.personalData.email}</Text>
          )}
          {data.personalData.phone && (
            <Text style={styles.contactInfo}>{data.personalData.phone}</Text>
          )}
          {data.personalData.location && (
            <Text style={styles.contactInfo}>{data.personalData.location}</Text>
          )}
        </View>

        {/* Perfil */}
        {data.presentation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil Profissional</Text>
            <Text style={styles.text}>{data.presentation}</Text>
          </View>
        )}

        {/* Experiência */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.company}>
                  {exp.company} • {formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate)}
                </Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Formação */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formação Académica</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={styles.jobTitle}>
                  {edu.degree} em {edu.field}
                </Text>
                <Text style={styles.company}>
                  {edu.institution} • {edu.current ? 'Em curso' : formatDate(edu.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Competências */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Competências</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certificações */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certificações</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <Text style={styles.jobTitle}>{cert.name}</Text>
                <Text style={styles.company}>
                  {cert.institution} • {cert.year}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Idiomas */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Idiomas</Text>
            {data.languages.map((lang, index) => (
              <Text key={index} style={styles.text}>
                {lang.language}: {lang.level}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
