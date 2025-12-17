// Projects Data
const projectsData = [
    {
        id: 1,
        title: "AgriAssist SL",
        description: "Complete farming management system with crop tracking, expense management, and real-time market prices. Farmers can record harvests, track expenses, and access farming best practices.",
        status: "live",
        statusText: "Live Project",
        category: "mobile",
        tech: ["Flutter", "Dart", "Supabase", "Google Maps API"],
        liveLink: "../projects/project1/index.html",
        githubLink: "#",
        icon: "fas fa-seedling",
        complexity: "Advanced",
        users: "500+",
        rating: "4.8"
    },
    {
        id: 2,
        title: "Real-Time Chat Application",
        description: "Modern chat application with user authentication, real-time messaging, file sharing, and typing indicators. Built with Firebase for instant updates.",
        status: "live",
        statusText: "Live Demo",
        category: "frontend",
        tech: ["React", "Firebase", "CSS", "JavaScript"],
        liveLink: "../realtimechat/index.html",
        githubLink: "#",
        icon: "fas fa-comments",
        complexity: "Intermediate",
        users: "1000+",
        rating: "4.9"
    },
    {
        id: 3,
        title: "Crypto Dashboard",
        description: "Real-time cryptocurrency tracking dashboard with interactive charts, portfolio management, and price alerts. Updates every 30 seconds with live market data.",
        status: "live",
        statusText: "Live Data",
        category: "frontend",
        tech: ["JavaScript", "Chart.js", "CoinGecko API", "Bootstrap"],
        liveLink: "../projects/project3/index.html",
        githubLink: "#",
        icon: "fas fa-chart-line",
        complexity: "Intermediate",
        users: "2000+",
        rating: "4.7"
    },
    {
        id: 4,
        title: "E-Commerce Platform",
        description: "Full-featured online store with shopping cart, user authentication, payment integration, and admin dashboard. Includes product filtering and reviews.",
        status: "demo",
        statusText: "Interactive Demo",
        category: "fullstack",
        tech: ["Node.js", "Express", "MongoDB", "Stripe"],
        liveLink: "../projects/project4/index.html",
        githubLink: "#",
        icon: "fas fa-shopping-cart",
        complexity: "Advanced",
        users: "Demo",
        rating: "4.8"
    },
    {
        id: 5,
        title: "Task Management App",
        description: "Productivity application with drag-and-drop task management, team collaboration, deadlines, and progress tracking. Features dark/light mode.",
        status: "live",
        statusText: "Live App",
        category: "frontend",
        tech: ["Vue.js", "LocalStorage", "CSS", "JavaScript"],
        liveLink: "../projects/project5/index.html",
        githubLink: "#",
        icon: "fas fa-tasks",
        complexity: "Intermediate",
        users: "1500+",
        rating: "4.6"
    },
    {
        id: 6,
        title: "Weather Forecast",
        description: "Beautiful weather application with 7-day forecasts, location detection, temperature units toggle, and weather alerts. Uses OpenWeather API.",
        status: "live",
        statusText: "Live API",
        category: "frontend",
        tech: ["JavaScript", "OpenWeather API", "CSS", "Geolocation"],
        liveLink: "../projects/project6/index.html",
        githubLink: "#",
        icon: "fas fa-cloud-sun",
        complexity: "Beginner",
        users: "3000+",
        rating: "4.5"
    },
    {
        id: 7,
        title: "Budget Tracker",
        description: "Personal finance manager with expense tracking, income recording, visual charts, and monthly budget planning. Works offline with PWA capabilities.",
        status: "demo",
        statusText: "PWA Demo",
        category: "tool",
        tech: ["PWA", "Chart.js", "IndexedDB", "JavaScript"],
        liveLink: "../projects/project7/index.html",
        githubLink: "#",
        icon: "fas fa-wallet",
        complexity: "Intermediate",
        users: "Demo",
        rating: "4.7"
    },
    {
        id: 8,
        title: "Recipe Finder",
        description: "Discover recipes based on ingredients you have. Includes step-by-step instructions, nutritional information, and meal planning features.",
        status: "live",
        statusText: "Live Search",
        category: "frontend",
        tech: ["React", "Edamam API", "CSS", "JavaScript"],
        liveLink: "../projects/project8/index.html",
        githubLink: "#",
        icon: "fas fa-utensils",
        complexity: "Intermediate",
        users: "2500+",
        rating: "4.8"
    },
    {
        id: 9,
        title: "Fitness Tracker",
        description: "Workout tracking application with exercise library, progress charts, workout plans, and calorie tracking. Syncs across devices.",
        status: "demo",
        statusText: "Web App",
        category: "mobile",
        tech: ["Flutter", "Firebase", "Health API", "Dart"],
        liveLink: "../projects/project9/index.html",
        githubLink: "#",
        icon: "fas fa-dumbbell",
        complexity: "Advanced",
        users: "Demo",
        rating: "4.6"
    },
    {
        id: 10,
        title: "Language Learning",
        description: "Interactive language learning platform with flashcards, pronunciation practice, quizzes, and progress tracking for multiple languages.",
        status: "live",
        statusText: "Learning Tool",
        category: "tool",
        tech: ["JavaScript", "Speech API", "LocalStorage", "CSS"],
        liveLink: "../projects/project10/index.html",
        githubLink: "#",
        icon: "fas fa-language",
        complexity: "Intermediate",
        users: "1800+",
        rating: "4.9"
    },
    {
        id: 11,
        title: "Music Player",
        description: "Modern web music player with playlist management, audio visualization, lyrics display, and crossfade between tracks.",
        status: "demo",
        statusText: "Web Player",
        category: "frontend",
        tech: ["HTML5 Audio", "JavaScript", "CSS", "Waveform"],
        liveLink: "../projects/project11/index.html",
        githubLink: "#",
        icon: "fas fa-music",
        complexity: "Intermediate",
        users: "Demo",
        rating: "4.7"
    },
    {
        id: 12,
        title: "Code Editor",
        description: "Browser-based code editor with syntax highlighting, multiple language support, file management, and live preview for web development.",
        status: "live",
        statusText: "Dev Tool",
        category: "tool",
        tech: ["CodeMirror", "JavaScript", "CSS", "HTML"],
        liveLink: "../projects/project12/index.html",
        githubLink: "#",
        icon: "fas fa-code",
        complexity: "Advanced",
        users: "1200+",
        rating: "4.8"
    },
    {
        id: 13,
        title: "Travel Planner",
        description: "Trip planning application with itinerary builder, expense tracking, location maps, and weather integration for destinations.",
        status: "demo",
        statusText: "Planning Tool",
        category: "mobile",
        tech: ["React Native", "Google Maps", "Firebase", "JavaScript"],
        liveLink: "../projects/project13/index.html",
        githubLink: "#",
        icon: "fas fa-plane",
        complexity: "Advanced",
        users: "Demo",
        rating: "4.6"
    },
    {
        id: 14,
        title: "AI Image Generator",
        description: "Generate images from text descriptions using AI models. Includes image editing, style transfer, and batch generation features.",
        status: "live",
        statusText: "AI Tool",
        category: "ai",
        tech: ["Python", "OpenAI API", "Flask", "JavaScript"],
        liveLink: "../projects/project14/index.html",
        githubLink: "#",
        icon: "fas fa-robot",
        complexity: "Advanced",
        users: "5000+",
        rating: "4.9"
    },
    {
        id: 15,
        title: "Blog Platform",
        description: "Modern blogging platform with WYSIWYG editor, user comments, SEO optimization, and social sharing features.",
        status: "demo",
        statusText: "CMS Demo",
        category: "fullstack",
        tech: ["Node.js", "MongoDB", "Express", "CKEditor"],
        liveLink: "../projects/project15/index.html",
        githubLink: "#",
        icon: "fas fa-blog",
        complexity: "Intermediate",
        users: "Demo",
        rating: "4.7"
    },
    {
        id: 16,
        title: "Stock Market Simulator",
        description: "Virtual stock trading platform with real-time market data, portfolio simulation, and trading competitions for learning.",
        status: "live",
        statusText: "Trading Sim",
        category: "backend",
        tech: ["Python", "Django", "WebSockets", "Chart.js"],
        liveLink: "../projects/project16/index.html",
        githubLink: "#",
        icon: "fas fa-chart-bar",
        complexity: "Advanced",
        users: "3000+",
        rating: "4.8"
    },
    {
        id: 17,
        title: "Event Booking System",
        description: "Complete event management system with ticket booking, QR code check-in, seating arrangement, and attendee management.",
        status: "demo",
        statusText: "Booking System",
        category: "fullstack",
        tech: ["React", "Node.js", "MongoDB", "QR Code"],
        liveLink: "../projects/project17/index.html",
        githubLink: "#",
        icon: "fas fa-calendar-check",
        complexity: "Advanced",
        users: "Demo",
        rating: "4.7"
    },
    {
        id: 18,
        title: "Health Monitoring",
        description: "Telehealth application with symptom checker, medication reminders, doctor appointment booking, and health data tracking.",
        status: "demo",
        statusText: "Health App",
        category: "mobile",
        tech: ["Flutter", "Firebase", "Health Kit", "Dart"],
        liveLink: "../projects/project18/index.html",
        githubLink: "#",
        icon: "fas fa-heartbeat",
        complexity: "Advanced",
        users: "Demo",
        rating: "4.8"
    },
    {
        id: 19,
        title: "Social Media Dashboard",
        description: "Analytics dashboard for social media management with post scheduling, engagement metrics, and content calendar.",
        status: "live",
        statusText: "Analytics Tool",
        category: "backend",
        tech: ["React", "Node.js", "MongoDB", "Chart.js"],
        liveLink: "../projects/project19/index.html",
        githubLink: "#",
        icon: "fas fa-chart-pie",
        complexity: "Advanced",
        users: "800+",
        rating: "4.7"
    },
    {
        id: 20,
        title: "AI Content Generator",
        description: "AI-powered content creation tool for articles, social media posts, and marketing copy with tone adjustment and plagiarism check.",
        status: "live",
        statusText: "AI Writer",
        category: "ai",
        tech: ["OpenAI API", "Python", "Flask", "JavaScript"],
        liveLink: "../projects/project20/index.html",
        githubLink: "#",
        icon: "fas fa-pen-fancy",
        complexity: "Advanced",
        users: "4000+",
        rating: "4.9"
    }
];

// Load all projects
function loadAllProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    container.innerHTML = '';

    projectsData.forEach(project => {
        const projectCard = `
            <div class="project-card-large" data-category="${project.category}">
                <div class="project-header">
                    <div class="project-number">${project.id}</div>
                    <div class="project-icon-large">
                        <i class="${project.icon}"></i>
                    </div>
                    <h3>${project.title}</h3>
                    <span class="project-status status-${project.status}">${project.statusText}</span>
                </div>
                
                <div class="project-description">
                    ${project.description}
                </div>
                
                <div class="project-tech-large">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <div class="project-links-large">
                    <a href="${project.liveLink}" class="project-btn project-btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubLink}" class="project-btn project-btn-secondary" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
                
                <div class="project-stats">
                    <div class="stat-item">
                        <div class="stat-value">${project.complexity}</div>
                        <div class="stat-label">Complexity</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${project.users}</div>
                        <div class="stat-label">Users</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${project.rating}/5</div>
                        <div class="stat-label">Rating</div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += projectCard;
    });
}

// Filter projects
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-large');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadAllProjects();
    setTimeout(setupFilterButtons, 100);
});