// Sample resume data for testing the generator
export const sampleResumeData = {
  personalInfo: {
    name: 'Raahim Nadeem',
    phone: '0336-7450450',
    email: 'raahim.nade@gmail.com',
    linkedin: 'linkedin.com/in/raahim-nadeem',
    github: 'github.com/RaahimNadeem',
    website: ''
  },
  education: [
    {
      institution: 'Lahore University of Management Sciences (LUMS)', 
      location: 'Lahore, Pakistan',
      degree: 'Bachelor of Science in Computer Science',
      dates: '2020 — 2024',
      gpa: '',
      honors: ''
    },
    
  ],
  experience: [
    {
      title: 'Software Engineer I',
      company: 'Careem',
      location: 'Lahore, PK',
      dates: 'April 2025 — Present',
      responsibilities: [
        'Migrated legacy codebase to a modern React 18 + Vite setup, significantly improving development speed and bundle efficiency for the internal portal.',
        'Led the transition of the internal portal to a unified Super Portal, coordinating cross-functional teams.',
        'Designed and developed a microservices-based backend using Go, gRPC with Protocol Buffers, and SQL, incorporating robust logging, structured error handling, and production-grade monitoring.',
        "Spearheaded curriculum design and delivery for an internal AI-in-Software Development course as part of the company's Learning and Development (L&D) program, focusing on practical applications of AI in engineering workflows."
    ]
    },
    {
      title: 'Software Engineer',
      company: 'GoSaaS, Inc.',
      location: 'Lahore, PK',
      dates: 'June 2014 — April 2025',
      responsibilities: [
        'Designed workflows to reduce project timelines and maintain data integrity, minimizing disruptions during the migration and ensuring a smooth transition to the new system.',
        'Contributed in data migration for company’s biggest client to date, extracting, transforming, and loading (ETL) of 6 million rows of data into their new Oracle AGILE PLM system.',
        'Designed and developed a reporting micro-service to unify reporting workflows across multiple products, enabling better decision-making for leadership teams.'
      ]
    },
    {
      title: 'Developer',
      company: 'Python',
      location: 'Remote',
      dates: 'May 2023 — Feb 2024',
      responsibilities: [
        'Created a comprehensive coding resource library with 800+ solutions across multiple programming languages, enhancing problem-solving efficiency for a global developer community.',
        'Contributed to a high-profile Google-commissioned project, refining algorithms and validating test cases for the training of Google’s Bard AI model.'
      ]
    }
  ],
  projects: [
    {
      name: 'Guftugu AI - Global SaaS Dialogue',
      technologies: 'Next.js, Typescript, OpenAI API, Tailwind CSS, Firebase, Shadcn',
      description: [
        'Engineered a highly responsive and interactive platform using Next JS.',
        'Designed an intuitive UI with Shadcn and leveraged Firebase v9 for robust data synchronization and cloud services.'
    ]
    },
    {
      name: 'ML-based Forest Fire Prediction',
      technologies: 'Python, Torch, scikit-learn, TensorFlow',
      description: [
        'Developed state-of-the-art image segmentation pipelines using UNet, ClipSeg, Segformer, SAM.',
        'Engineered a robust ML model employing NVIDIA’s XGBoost and TensorFlow, resulting in a 93.13% prediction accuracy rate.',
      ]
    }
  ],
  skills: {
    languages: 'Java, Python, C/C++, SQL (PostgreSQL, MySQL, OracleSQL), JavaScript, Go, Haskell, HTML/CSS',
    frameworks: 'React.js, Next.js, Tailwind CSS, Node.js, Express.js, BullMQ, Mantine, MUI, FastAPI, MongoDB, Knex.js',
    developerTools: 'Git, Docker, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse',
  }
};
