// Initialize Lucide icons
lucide.createIcons();

// Experience data with company logos
const experiences = [
    {
        title: "IT Infrastructure Support Engineer",
        company: "Lembaga Pengembangan Komputerisasi Gunadarma",
        period: "Sep 2024 - Present",
        logo: "G",
        logoColor: "#4285F4",
        achievements: [
            "Managed 7 servers, 144 thin clients, and virtual machines using VMware/vSphere",
            "Administered user accounts, access controls, and system reliability",
            "Updated course materials on Moodle and maintained hardware across training facilities"
        ]
    },
    {
        title: "Course Instructor",
        company: "Lembaga Pengembangan Komputerisasi Gunadarma",
        period: "Apr 2024 - Present",
        logo: "G",
        logoColor: "#4285F4",
        achievements: [
            "Taught programming languages (Go, Java, Delphi, PHP) through engaging lectures",
            "Designed course materials and provided mentorship to students",
            "Evaluated student performance and offered constructive feedback"
        ]
    },
    {
        title: "Mobile Development Cohort",
        company: "Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)",
        period: "Feb 2024 - Jul 2024",
        logo: "B",
        logoColor: "#0F9D58",
        achievements: [
            "Completed comprehensive Kotlin training with 100% proficiency score",
            "Gained expertise in Jetpack Compose, reducing UI development time by 30%",
            "Developed Glowfy skin health app, improving diagnostic accuracy by 40%"
        ]
    },
    {
        title: "Mobile Apps Developer Intern",
        company: "PT Bank Mandiri x Rakamin Academy",
        period: "Feb 2024 - Mar 2024",
        logo: "M",
        logoColor: "#005BAA",
        achievements: [
            "Completed intensive Kotlin and API integration program with 84.75% score",
            "Ranked in top 10% of cohort and received Certificate of Achievement",
            "Developed news application with NewsAPI, increasing engagement by 50%"
        ]
    },
    {
        title: "Mobile Development Intern",
        company: "Lembaga Layanan Pendidikan Tinggi Wilayah III",
        period: "Sep 2024 - Jan 2024",
        logo: "L",
        logoColor: "#FF5722",
        achievements: [
            "Designed and developed Android app featuring parenting modules and community platforms",
            "Conducted field research and gathered feedback from 80% of community members",
            "Collaborated remotely and on-site, ensuring 100% on-time project delivery"
        ]
    }
];

// Projects data with enhanced details
const projects = [
    {
        id: 1,
        title: "Glowfy - Skin Health App",
        subtitle: "AI-Powered Skin Diagnostic Application",
        category: "android",
        tags: ["Kotlin", "Jetpack Compose", "ML", "Cloud Services"],
        description: "A comprehensive skin health application with cloud services and machine learning integration, improving diagnostic accuracy by 40%.",
        fullDescription: "Glowfy is an innovative skin health application developed during the Bangkit Academy program. The app leverages machine learning algorithms to analyze skin conditions and provide accurate diagnostics. Built with Kotlin and Jetpack Compose, it features a modern UI and seamless user experience.",
        duration: "6 months",
        teamSize: "4 developers",
        features: [
            "AI-powered skin condition analysis",
            "Cloud-based data storage and processing",
            "Real-time diagnostic results",
            "User-friendly interface with Jetpack Compose",
            "Integration with healthcare professionals",
            "Progress tracking and history",
            "Offline mode for basic features",
            "Multi-language support"
        ],
        technologies: ["Kotlin", "Jetpack Compose", "TensorFlow Lite", "Firebase", "Cloud Storage", "REST APIs", "CameraX", "Room Database"],
        achievements: [
            "40% improvement in diagnostic accuracy",
            "Positive feedback during testing phase",
            "Successfully integrated ML models",
            "Scalable cloud architecture implementation",
            "Featured in Bangkit Academy showcase",
            "10,000+ downloads in beta testing"
        ],
        image: "../assets/glowfy-app.png"
    },
    {
        id: 2,
        title: "News Application",
        subtitle: "Modern News Reader with API Integration",
        category: "android",
        tags: ["Kotlin", "API Integration", "Android"],
        description: "A modern news application with NewsAPI integration, featuring clean UI and increasing user engagement by 50%.",
        fullDescription: "A comprehensive news application developed during the Bank Mandiri internship program. The app provides real-time news updates from various sources with a clean, intuitive interface.",
        duration: "2 months",
        teamSize: "2 developers",
        features: [
            "Real-time news updates",
            "Category-based news filtering",
            "Bookmark favorite articles",
            "Search functionality",
            "Offline reading capability",
            "Share articles on social media",
            "Dark mode support",
            "Push notifications"
        ],
        technologies: ["Kotlin", "NewsAPI", "Retrofit", "Room Database", "MVVM Architecture", "Material Design", "Glide", "WorkManager"],
        achievements: [
            "50% increase in user engagement",
            "Top 10% ranking in internship program",
            "Certificate of Achievement received",
            "Successful API integration implementation",
            "Clean architecture implementation",
            "Excellent performance optimization"
        ],
        image: "../assets/newsphere-app.png"
    },
    {
        id: 3,
        title: "Parenting Community App",
        subtitle: "Community Platform for Parents",
        category: "android",
        tags: ["Android", "Community", "Social"],
        description: "Android app featuring parenting modules, community platforms, and expert consultations for human resource development.",
        fullDescription: "A community-focused Android application designed to support parents through educational modules, peer-to-peer interaction, and expert consultations. Developed as part of a community service project.",
        duration: "4 months",
        teamSize: "5 developers",
        features: [
            "Educational parenting modules",
            "Community discussion forums",
            "Expert consultation booking",
            "Progress tracking for children",
            "Resource sharing platform",
            "Local community integration",
            "Event management system",
            "Multilingual support"
        ],
        technologies: ["Android SDK", "Java", "Firebase", "SQLite", "Material Design", "Google Maps API", "FCM", "Retrofit"],
        achievements: [
            "80% positive feedback from community members",
            "100% on-time project delivery",
            "Successful field research implementation",
            "Effective collaboration with village officials",
            "Community impact recognition",
            "Sustainable development goals alignment"
        ],
        image: "../assets/eparenting-app.png"
    },
    {
        id: 4,
        title: "E-Learning Platform",
        subtitle: "Comprehensive Online Education System",
        category: "web",
        tags: ["PHP", "MySQL", "Bootstrap"],
        description: "A comprehensive e-learning platform for course management and student interaction.",
        fullDescription: "A full-featured e-learning platform developed to facilitate online education. The platform includes course management, student enrollment, progress tracking, and interactive learning tools.",
        duration: "8 months",
        teamSize: "6 developers",
        features: [
            "Course creation and management",
            "Student enrollment system",
            "Progress tracking and analytics",
            "Interactive quizzes and assignments",
            "Discussion forums",
            "Certificate generation",
            "Video streaming integration",
            "Mobile responsive design"
        ],
        technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript", "jQuery", "Chart.js", "FFmpeg", "Apache"],
        achievements: [
            "Successfully deployed for multiple institutions",
            "Improved student engagement by 60%",
            "Streamlined course management process",
            "Positive feedback from educators",
            "Scalable architecture implementation",
            "Cost-effective solution delivery"
        ]
    },
    {
        id: 5,
        title: "Inventory Management System",
        subtitle: "Modern Business Inventory Solution",
        category: "web",
        tags: ["Go", "PostgreSQL", "React"],
        description: "A modern inventory management system built with Go backend and React frontend.",
        fullDescription: "A comprehensive inventory management system designed for small to medium businesses. Features real-time inventory tracking, automated reorder points, and detailed analytics.",
        duration: "5 months",
        teamSize: "3 developers",
        features: [
            "Real-time inventory tracking",
            "Automated reorder notifications",
            "Barcode scanning integration",
            "Sales and purchase management",
            "Detailed reporting and analytics",
            "Multi-location support",
            "Role-based access control",
            "API integration capabilities"
        ],
        technologies: ["Go", "PostgreSQL", "React", "REST APIs", "Docker", "Redis", "JWT", "WebSocket"],
        achievements: [
            "Reduced inventory errors by 75%",
            "Improved efficiency by 50%",
            "Successfully deployed for 10+ businesses",
            "Positive ROI within 3 months",
            "High-performance architecture",
            "Excellent user satisfaction scores"
        ]
    },
    {
        id: 6,
        title: "Image Classification Model",
        subtitle: "Deep Learning Computer Vision System",
        category: "ml",
        tags: ["Python", "TensorFlow", "Computer Vision"],
        description: "A deep learning model for image classification with high accuracy rates.",
        fullDescription: "An advanced image classification model developed using deep learning techniques. The model can classify images across multiple categories with high accuracy and has been optimized for mobile deployment.",
        duration: "3 months",
        teamSize: "2 researchers",
        features: [
            "Multi-class image classification",
            "High accuracy rates (95%+)",
            "Mobile-optimized model",
            "Real-time inference",
            "Transfer learning implementation",
            "Data augmentation techniques",
            "Model compression",
            "Batch processing support"
        ],
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Matplotlib", "Scikit-learn", "ONNX"],
        achievements: [
            "95%+ accuracy on test dataset",
            "Successfully deployed on mobile devices",
            "Optimized model size for mobile",
            "Published research findings",
            "Conference presentation delivered",
            "Open-source contribution made"
        ]
    }
];

// Certificates data
const certificates = [
    {
        title: "Intermediate Android Development",
        issuer: "Dicoding Indonesia",
        year: "2024",
        type: "Course Completion",
        icon: "award",
        color: "#4285F4"
    },
    {
        title: "ML Implementation on Android",
        issuer: "Dicoding Indonesia",
        year: "2024",
        type: "Course Completion",
        icon: "award",
        color: "#4285F4"
    },
    {
        title: "SOLID Programming Principles",
        issuer: "Dicoding Indonesia",
        year: "2024",
        type: "Course Completion",
        icon: "award",
        color: "#4285F4"
    },
    {
        title: "Certificate of Achievement",
        issuer: "Bank Mandiri x Rakamin",
        year: "2024",
        type: "Achievement",
        icon: "trophy",
        color: "#005BAA"
    },
    {
        title: "Junior Mobile Programmer",
        issuer: "BNSP",
        year: "2024",
        type: "Professional Certification",
        icon: "certificate",
        color: "#0F9D58"
    },
    {
        title: "Android Fundamentals",
        issuer: "Dicoding Indonesia",
        year: "2023",
        type: "Course Completion",
        icon: "award",
        color: "#4285F4"
    },
    {
        title: "Kotlin Programming",
        issuer: "Dicoding Indonesia",
        year: "2023",
        type: "Course Completion",
        icon: "award",
        color: "#4285F4"
    },
    {
        title: "Git Version Control",
        issuer: "Dicoding Indonesia",
        year: "2023",
        type: "Course Completion",
        icon: "award",
        color: "#4285F4"
    }
];

// Dark mode functionality
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', currentTheme === 'dark');

function toggleTheme() {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    lucide.createIcons();
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Populate experience section
function populateExperiences() {
    const container = document.getElementById('experience-container');
    const visibleCount = 3;
    
    experiences.forEach((exp, index) => {
        const expElement = document.createElement('div');
        expElement.className = `bg-white dark:bg-dark-card rounded-2xl shadow-lg p-10 card-hover fade-in experience-item ${index >= visibleCount ? 'hidden' : ''} group`;
        expElement.style.setProperty('--stagger', index);
        expElement.innerHTML = `
            <div class="flex items-start space-x-6 mb-6">
                <div class="company-logo group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" style="background-color: ${exp.logoColor}">
                    ${exp.logo}
                </div>
                <div class="flex-1">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-dark-text group-hover:text-black dark:group-hover:text-white transition-colors">${exp.title}</h3>
                            <p class="text-gray-900 dark:text-gray-300 font-bold text-lg mt-1">${exp.company}</p>
                        </div>
                        <div class="text-gray-600 dark:text-gray-400 mt-3 md:mt-0">
                            <span class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-semibold">${exp.period}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="text-gray-700 dark:text-gray-300 space-y-3 ml-20">
                ${exp.achievements.map((achievement, i) => `
                    <li class="flex items-start space-x-3 hover-lift" style="--stagger: ${i}">
                        <i data-lucide="check-circle" class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0"></i>
                        <span class="text-lg">${achievement}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        container.appendChild(expElement);
    });
    
    lucide.createIcons();
}

// Populate projects section
function populateProjects() {
    const container = document.getElementById('projects-container');
    const visibleCount = 3;
    
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = `project-card dark:bg-dark-card fade-in ${index >= visibleCount ? 'hidden' : ''} stagger-animation`;
        projectElement.setAttribute('data-category', project.category);
        projectElement.style.setProperty('--stagger', index);
        
        const gradientColors = {
            android: 'from-gray-800 to-black',
            web: 'from-gray-700 to-gray-900',
            ml: 'from-gray-600 to-gray-800'
        };
        
        const icons = {
            android: 'smartphone',
            web: 'globe',
            ml: 'brain'
        };
        
        projectElement.innerHTML = `
            <div class="project-image bg-gradient-to-br ${gradientColors[project.category]} flex items-center justify-center relative">
                ${
                project.image
                    ? `<img src="${project.image}" alt="${project.title}" class="absolute inset-0 w-full h-full object-cover rounded-t-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">`
                    : `<i data-lucide="${icons[project.category]}" class="project-icon w-20 h-20 text-white z-10"></i>`
                }
            </div>
            <div class="p-8">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">${project.category}</span>
                    <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
                        <div class="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-dark-text mb-3">${project.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6 text-base leading-relaxed">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-8">
                    ${project.tags.slice(0, 3).map(tag => `
                        <span class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-semibold">${tag}</span>
                    `).join('')}
                    ${project.tags.length > 3 ? `<span class="text-gray-900 dark:text-white text-sm font-semibold">+${project.tags.length - 3} more</span>` : ''}
                </div>
                <button class="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-bold view-project-btn flex items-center justify-center space-x-3 group" data-project-id="${project.id}">
                    <span>View Details</span>
                    <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                </button>
            </div>
        `;
        container.appendChild(projectElement);
    });
    
    lucide.createIcons();
}

// Populate certificates section
function populateCertificates() {
    const container = document.getElementById('certificates-container');
    const visibleCount = 3;
    
    certificates.forEach((cert, index) => {
        const certElement = document.createElement('div');
        certElement.className = `certificate-card fade-in ${index >= visibleCount ? 'hidden' : ''} stagger-animation`;
        certElement.style.setProperty('--stagger', index);
        
        certElement.innerHTML = `
            <div class="certificate-preview">
                <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl" style="background-color: ${cert.color}">
                    <i data-lucide="${cert.icon}" class="w-10 h-10"></i>
                </div>
                <div class="certificate-overlay">
                    <button class="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        View Certificate
                    </button>
                </div>
            </div>
            <div class="certificate-content">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">${cert.type}</span>
                    <span class="text-xs font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">${cert.year}</span>
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-dark-text mb-2">${cert.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 font-semibold">${cert.issuer}</p>
            </div>
        `;
        container.appendChild(certElement);
    });
    
    lucide.createIcons();
}

// Project filtering
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Enhanced project modal functionality
function setupProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtns = [document.getElementById('close-modal'), document.getElementById('close-modal-footer')];
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    
    // Close modal
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tabName}`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Open modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-project-btn')) {
            const projectId = parseInt(e.target.getAttribute('data-project-id'));
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                modalTitle.textContent = project.title;
                modalSubtitle.textContent = project.subtitle;
                
                // Populate overview tab
                document.getElementById('modal-description').textContent = project.fullDescription;
                document.getElementById('modal-duration').textContent = project.duration;
                document.getElementById('modal-team').textContent = project.teamSize;
                document.getElementById('modal-category').textContent = project.category.charAt(0).toUpperCase() + project.category.slice(1);
                
                // Populate features tab
                const featuresContainer = document.getElementById('modal-features');
                featuresContainer.innerHTML = project.features.map(feature => `
                    <div class="feature-item">
                        <div class="flex items-start space-x-3">
                            <i data-lucide="check" class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0"></i>
                            <span class="text-gray-600 dark:text-gray-400 text-lg">${feature}</span>
                        </div>
                    </div>
                `).join('');
                
                // Populate technologies tab
                const techContainer = document.getElementById('modal-technologies');
                techContainer.innerHTML = project.technologies.map(tech => `
                    <div class="tech-item text-center">
                        <div class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-bold text-lg">
                            ${tech}
                        </div>
                    </div>
                `).join('');
                
                // Populate achievements tab
                const achievementsContainer = document.getElementById('modal-achievements');
                achievementsContainer.innerHTML = project.achievements.map(achievement => `
                    <div class="achievement-item">
                        <div class="flex items-start space-x-3">
                            <i data-lucide="trophy" class="w-6 h-6 text-yellow-500 mt-0.5 flex-shrink-0"></i>
                            <span class="text-gray-600 dark:text-gray-400 text-lg">${achievement}</span>
                        </div>
                    </div>
                `).join('');
                
                // Reset to first tab
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                document.querySelector('.tab-button[data-tab="overview"]').classList.add('active');
                document.getElementById('tab-overview').classList.add('active');
                
                lucide.createIcons();
                modal.classList.remove('hidden');
            }
        }
    });
}

// Show more/less functionality
function setupToggleButtons() {
    // About section toggle
    const aboutToggle = document.getElementById('about-toggle');
    const aboutText = document.getElementById('about-text');
    const fullAboutText = "Computer Science undergraduate at Gunadarma University with practical experience in Android development using Kotlin and Jetpack Compose. Actively engaged in projects and internships that focus on creating user-friendly applications. Keen to further develop professional skills in a dynamic tech environment. Passionate about mobile development, machine learning, and system administration. Always eager to learn new technologies and contribute to innovative projects that make a positive impact on society.";
    const shortAboutText = "Computer Science undergraduate at Gunadarma University with practical experience in Android development using Kotlin and Jetpack Compose. Actively engaged in projects and internships that focus on creating user-friendly applications...";
    
    let aboutExpanded = false;
    aboutText.textContent = shortAboutText;
    
    aboutToggle.addEventListener('click', () => {
        aboutExpanded = !aboutExpanded;
        aboutText.textContent = aboutExpanded ? fullAboutText : shortAboutText;
        aboutToggle.querySelector('.show-more').classList.toggle('hidden', aboutExpanded);
        aboutToggle.querySelector('.show-less').classList.toggle('hidden', !aboutExpanded);
        aboutToggle.querySelector('.show-more-icon').classList.toggle('hidden', aboutExpanded);
        aboutToggle.querySelector('.show-less-icon').classList.toggle('hidden', !aboutExpanded);
    });
    
    // Experience section toggle
    const experienceToggle = document.getElementById('experience-toggle');
    let experienceExpanded = false;
    
    experienceToggle.addEventListener('click', () => {
        experienceExpanded = !experienceExpanded;
        const hiddenExperiences = document.querySelectorAll('.experience-item.hidden');
        const visibleExperiences = document.querySelectorAll('.experience-item:not(.hidden)');
        
        if (experienceExpanded) {
            hiddenExperiences.forEach(exp => exp.classList.remove('hidden'));
        } else {
            visibleExperiences.forEach((exp, index) => {
                if (index >= 3) exp.classList.add('hidden');
            });
        }
        
        experienceToggle.querySelector('.show-more').classList.toggle('hidden', experienceExpanded);
        experienceToggle.querySelector('.show-less').classList.toggle('hidden', !experienceExpanded);
        experienceToggle.querySelector('.show-more-icon').classList.toggle('hidden', experienceExpanded);
        experienceToggle.querySelector('.show-less-icon').classList.toggle('hidden', !experienceExpanded);
    });
    
    // Projects section toggle
    const projectsToggle = document.getElementById('projects-toggle');
    let projectsExpanded = false;
    
    projectsToggle.addEventListener('click', () => {
        projectsExpanded = !projectsExpanded;
        const hiddenProjects = document.querySelectorAll('.project-card.hidden');
        const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)');
        
        if (projectsExpanded) {
            hiddenProjects.forEach(project => project.classList.remove('hidden'));
        } else {
            visibleProjects.forEach((project, index) => {
                if (index >= 3) project.classList.add('hidden');
            });
        }
        
        projectsToggle.querySelector('.show-more').classList.toggle('hidden', projectsExpanded);
        projectsToggle.querySelector('.show-less').classList.toggle('hidden', !projectsExpanded);
        projectsToggle.querySelector('.show-more-icon').classList.toggle('hidden', projectsExpanded);
        projectsToggle.querySelector('.show-less-icon').classList.toggle('hidden', !projectsExpanded);
    });

    // Certificates section toggle
    const certificatesToggle = document.getElementById('certificates-toggle');
    let certificatesExpanded = false;
    
    certificatesToggle.addEventListener('click', () => {
        certificatesExpanded = !certificatesExpanded;
        const hiddenCertificates = document.querySelectorAll('.certificate-card.hidden');
        const visibleCertificates = document.querySelectorAll('.certificate-card:not(.hidden)');
        
        if (certificatesExpanded) {
            hiddenCertificates.forEach(cert => cert.classList.remove('hidden'));
        } else {
            visibleCertificates.forEach((cert, index) => {
                if (index >= 3) cert.classList.add('hidden');
            });
        }
        
        certificatesToggle.querySelector('.show-more').classList.toggle('hidden', certificatesExpanded);
        certificatesToggle.querySelector('.show-less').classList.toggle('hidden', !certificatesExpanded);
        certificatesToggle.querySelector('.show-more-icon').classList.toggle('hidden', certificatesExpanded);
        certificatesToggle.querySelector('.show-less-icon').classList.toggle('hidden', !certificatesExpanded);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            mobileMenu.classList.add('hidden');
        }
    });
});

// Typing animation
const typingText = document.getElementById('typing-text');
const texts = [
    'Mobile Developer & IT Infrastructure Engineer',
    'Android Developer with Kotlin & Jetpack Compose',
    'Course Instructor & Technology Enthusiast',
    'Computer Science Student at Gunadarma University'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}
Email: ${email}

Message:
${message}`);
    const mailtoLink = `mailto:farhanfathur73@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    alert('Thank you for your message! Your email client should open now.');
    this.reset();
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary');
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation
    setTimeout(typeWriter, 1000);
    
    // Populate sections
    populateExperiences();
    populateProjects();
    populateCertificates();
    
    // Setup functionality
    setupProjectFilters();
    setupProjectModal();
    setupToggleButtons();
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Refresh icons after all content is loaded
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
});