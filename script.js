/* ==========================================================================
   PORTFOLIO INTERACTION ENGINE - MD. SOFIQUL ISLAM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initParticles();
    initHeaderScroll();
    initMobileMenu();
    initTerminalWidget();
    initRevealAnimations();
    initSystemMetrics();
    initSkillsTabs();
    initProjectsFilterAndModal();
    initWord2VecVisualizer();
    initTimelineTracker();
    initGitHubGrid();
    initContactForm();
});

/* ==========================================================================
   SYSTEM LOADER
   ========================================================================== */
function initLoader() {
    const loaderScreen = document.getElementById('loading-screen');
    const loaderProgressBar = document.querySelector('.loader-progress-bar');
    const statusText = document.getElementById('loader-status-text');
    
    const logs = [
        'INITIALIZING QUANTUM MODULES...',
        'CONNECTING SYSTEM CHANNELS...',
        'COMPILING CORE WEB COMPONENTS...',
        'BOOTSTRAPPING AI/ML INTERFACES...',
        'ESTABLISHING VECTOR PROTOCOLS...',
        'SYSTEM READY. DEPLOYING PORTFOLIO...'
    ];
    
    let progress = 0;
    let logIndex = 0;
    
    const progressInterval = setInterval(() => {
        // Increment progress speed
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Fade out loader
            setTimeout(() => {
                loaderScreen.style.opacity = '0';
                document.body.classList.remove('loading-active');
                loaderScreen.setAttribute('aria-hidden', 'true');
                setTimeout(() => {
                    loaderScreen.style.display = 'none';
                }, 500);
            }, 400);
        }
        
        loaderProgressBar.style.width = `${progress}%`;
        
        // Update loader status text sequentially
        const targetLogIndex = Math.floor((progress / 100) * logs.length);
        if (targetLogIndex > logIndex && targetLogIndex < logs.length) {
            logIndex = targetLogIndex;
            statusText.textContent = logs[logIndex];
        }
    }, 100);
}

/* ==========================================================================
   CUSTOM CURSOR TRAILING EFFECT
   ========================================================================== */
function initCustomCursor() {
    const dot = document.querySelector('.custom-cursor-dot');
    const outline = document.querySelector('.custom-cursor-outline');
    
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for the dot
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });
    
    // Animate trailing outline with easing/interpolation
    function animateCursor() {
        const easing = 0.15; // Delay multiplier
        outlineX += (mouseX - outlineX) * easing;
        outlineY += (mouseY - outlineY) * easing;
        
        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover states on interactive tags
    const hoverSelectors = 'a, button, .project-card, .timeline-content, .vector-query-btn, .skills-tab-btn, .slider-handle, .git-cell';
    
    function addHoverClass() {
        document.body.classList.add('custom-cursor-hover');
    }
    
    function removeHoverClass() {
        document.body.classList.remove('custom-cursor-hover');
    }
    
    // Delegate hover listeners dynamically
    document.body.addEventListener('mouseenter', (e) => {
        if (e.target.matches && e.target.matches(hoverSelectors)) {
            addHoverClass();
        }
    }, true);
    
    document.body.addEventListener('mouseleave', (e) => {
        if (e.target.matches && e.target.matches(hoverSelectors)) {
            removeHoverClass();
        }
    }, true);
}

/* ==========================================================================
   PARTICLES INTERACTIVE GRAPHICS (Neural Net Background)
   ========================================================================== */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    let mouse = {
        x: null,
        y: null,
        radius: 120 // Interaction radius
    };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    });
    
    // Particle Blueprints
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        update() {
            // Collision detection at boundary
            if (this.x > width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Mouse gravity attraction
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= dx * force * 0.03; // pull/push speed
                    this.y -= dy * force * 0.03;
                }
            }
            
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }
    
    // Populating particle arrays
    function init() {
        particlesArray = [];
        // Scale particle count with screen width
        let numberOfParticles = (width * height) / 11000;
        numberOfParticles = Math.min(numberOfParticles, 120); // Cap it
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 2 + 1;
            let x = Math.random() * (width - size * 2) + size;
            let y = Math.random() * (height - size * 2) + size;
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(0, 242, 254, 0.4)'; // Cyan
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    
    // Draw lines connecting particles (neural nodes)
    function connect() {
        let opacityValue = 1;
        const maxDistance = 140;
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    opacityValue = 1 - (distance / maxDistance);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.12})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

/* ==========================================================================
   HEADER SCROLL & SCROLL METRICS
   ========================================================================== */
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    const scrollBar = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // 1. Shrink header
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 2. Scroll Progress bar
        const scrolledPercentage = (scrollTop / docHeight) * 100;
        scrollBar.style.width = `${scrolledPercentage}%`;
        
        // 3. Back-to-top visibility
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // 4. Update Navigation active link status
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Back-to-top trigger click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   MOBILE MENU OVERLAY HANDLER
   ========================================================================== */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');
    
    if (!toggle || !nav) return;
    
    function toggleMenu() {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    }
    
    function closeMenu() {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }
    
    toggle.addEventListener('click', toggleMenu);
    
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* ==========================================================================
   TYPING TERMINAL WIDGET
   ========================================================================== */
function initTerminalWidget() {
    const terminalOutput = document.getElementById('terminal-profile-output');
    const resetBtn = document.querySelector('.terminal-reset-btn');
    const commandText = document.querySelector('.typed-command');
    
    if (!terminalOutput || !commandText) return;
    
    const commandStr = commandText.getAttribute('data-cmd');
    
    const profileLogs = [
        "<span class='out-cyan'>guest@gub:~$ profile --info</span>",
        "Loading system database core...",
        "<span class='out-green'>[SUCCESS] Connection established.</span>",
        "",
        "&gt; <span class='out-yellow'>Name:</span> Md. Sofiqul Islam",
        "&gt; <span class='out-yellow'>Title:</span> Software Engineer | Full Stack | AI & ML Enthusiast",
        "&gt; <span class='out-yellow'>Education:</span> B.Sc. in Computer Science and Engineering",
        "&gt; <span class='out-yellow'>University:</span> Green University of Bangladesh",
        "&gt; <span class='out-yellow'>Location:</span> Bangladesh",
        "&gt; <span class='out-yellow'>Interests:</span> Software Eng, ML, NLP, Full Stack Apps",
        "&gt; <span class='out-yellow'>UK Higher Studies Readiness:</span> In Preparation",
        "",
        "<span class='out-cyan'>guest@gub:~$ _</span>"
    ];
    
    let typeIndex = 0;
    
    function typeCommand() {
        if (typeIndex < commandStr.length) {
            commandText.textContent += commandStr.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeCommand, 60 + Math.random() * 40);
        } else {
            // Typing complete, output diagnostics line by line
            setTimeout(printLogs, 400);
        }
    }
    
    let logIndex = 0;
    function printLogs() {
        if (logIndex < profileLogs.length) {
            const line = document.createElement('div');
            line.innerHTML = profileLogs[logIndex];
            terminalOutput.appendChild(line);
            logIndex++;
            
            // Scroll down
            const body = document.querySelector('.terminal-body');
            body.scrollTop = body.scrollHeight;
            
            setTimeout(printLogs, 150 + Math.random() * 100);
        }
    }
    
    function resetTerminal() {
        commandText.textContent = '';
        terminalOutput.innerHTML = '';
        typeIndex = 0;
        logIndex = 0;
        setTimeout(typeCommand, 500);
    }
    
    resetBtn.addEventListener('click', resetTerminal);
    
    // Initial start
    setTimeout(typeCommand, 1500);
}

/* ==========================================================================
   SCROLL REVEAL (Intersection Observers)
   ========================================================================== */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's the skills section, animate skill indicators
                if (entry.target.id === 'skills') {
                    animateSkillsProgress();
                }
                
                // If it's the about section, animate numeric metrics
                if (entry.target.id === 'about') {
                    animateStatsNumbers();
                }
            }
        });
    }, {
        threshold: 0.15
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   METRICS COUNTER ANIMATIONS
   ========================================================================== */
let statsAnimated = false;
function animateStatsNumbers() {
    if (statsAnimated) return;
    statsAnimated = true;
    
    const statsData = [
        { id: 'metric-commits', target: 1432, suffix: '' },
        { id: 'metric-projects', target: 8, suffix: '+' },
        { id: 'metric-experience', target: 12, suffix: 'm' },
        { id: 'metric-hours', target: 2480, suffix: 'h' }
    ];
    
    statsData.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;
        
        let current = 0;
        const duration = 1500; // ms
        const steps = 50;
        const increment = item.target / steps;
        const stepTime = duration / steps;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= item.target) {
                current = item.target;
                clearInterval(counter);
            }
            el.textContent = Math.floor(current) + item.suffix;
        }, stepTime);
    });
}

function initSystemMetrics() {
    // Handled by Intersection Observer triggers inside animateStatsNumbers()
}

/* ==========================================================================
   SKILLS VISUALIZATION & TAB SYSTEM
   ========================================================================== */
function initSkillsTabs() {
    const tabs = document.querySelectorAll('.skills-tab-btn');
    const panels = document.querySelectorAll('.skills-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetPanelId = tab.getAttribute('aria-controls');
            
            // Reset active tabs & panels
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => p.classList.remove('active'));
            
            // Set current tab & panel active
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const targetPanel = document.getElementById(targetPanelId);
            targetPanel.classList.add('active');
            
            // Animate details inside panel
            animateSkillsProgress();
        });
    });
}

function animateSkillsProgress() {
    // 1. Linear progress animation
    const progressBars = document.querySelectorAll('.linear-progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
    
    // 2. Circular progress animation
    const circularDials = document.querySelectorAll('.circular-progress');
    circularDials.forEach(dial => {
        const targetPct = parseInt(dial.getAttribute('data-percentage'), 10);
        const valueDisplay = dial.querySelector('.progress-value');
        
        let startPct = 0;
        const duration = 1200; // ms
        const steps = 50;
        const increment = targetPct / steps;
        const stepTime = duration / steps;
        
        // Prevent re-triggering if already animated
        if (dial.classList.contains('animated')) return;
        dial.classList.add('animated');
        
        const dialCounter = setInterval(() => {
            startPct += increment;
            if (startPct >= targetPct) {
                startPct = targetPct;
                clearInterval(dialCounter);
            }
            
            const displayVal = Math.floor(startPct);
            valueDisplay.textContent = `${displayVal}%`;
            
            // Update conic gradient background
            dial.style.background = `conic-gradient(var(--color-accent) ${displayVal}%, #172033 ${displayVal}%)`;
        }, stepTime);
    });
}

/* ==========================================================================
   PROJECTS FILTER & MULTI-DETAIL MODALS
   ========================================================================== */
const projectDatabase = {
    hms: {
        title: "Hospital Management System",
        category: "Full Stack Development",
        role: "Lead Developer",
        duration: "8 Months",
        liveUrl: "http://hms-gub.free.nf",
        codeUrl: "#",
        desc: "Developed a complete Hospital Management System website addressing multi-level authentication diagnostics and workflow schedules. The application manages resources across dynamic environments.",
        features: [
            "Secure User Multi-Authentication (Admin, Doctors, Patients)",
            "Appointment Scheduling Calendar Module",
            "Medical Diagnosis Record Directories",
            "Billing and Prescription Form Generators",
            "Staff and Patient Scheduling dashboard panel"
        ],
        team: [
            "Md. Sofiqul Islam (Lead)",
            "Ummay Sania Sazzat Akhi",
            "Mohammad Yousuf Ibna Alam Bappy"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Database Systems", "Full Stack Development"]
    },
    smarthome: {
        title: "Smart Home Automation System",
        category: "Smart Systems",
        role: "IoT System Integrator",
        duration: "4 Months",
        liveUrl: "#",
        codeUrl: "#",
        desc: "Developed a smart home systems controller allowing automated integration of household utilities via voice, visual signals, and client dashboards.",
        features: [
            "Voice Processing Commands Recognition",
            "Motion Sensor Alarms & Alerts",
            "Responsive Web App Remote Dashboard",
            "Automated Hardware Appliance Rules"
        ],
        team: [
            "Sumaiya Akhter Chowdhury",
            "Rayhan Rahman Samin",
            "Md. Sofiqul Islam"
        ],
        tech: ["Python", "IoT Systems", "Speech Recognition Algorithms", "Web Sockets"]
    },
    houseprice: {
        title: "House Price Prediction Model",
        category: "AI & Machine Learning",
        role: "Machine Learning Developer",
        duration: "3 Months",
        liveUrl: "#",
        codeUrl: "#",
        desc: "Developed a mathematical data engine that runs regression analysis algorithms to predict average real-estate market valuation rates based on geographical variables.",
        features: [
            "Supervised Machine Learning Training Models",
            "User-Friendly Variables Interface",
            "Data Analytics Chart Visualizer (Matplotlib)",
            "Linear Regression Algorithmic Processing Core"
        ],
        team: [
            "Md. Sofiqul Islam (Solo Developer)"
        ],
        tech: ["Python", "Machine Learning", "Linear Regression", "NumPy & Pandas"]
    },
    multigame: {
        title: "AI Multi-Game Desktop Platform",
        category: "AI Applications",
        role: "Desktop Software Developer",
        duration: "5 Months",
        liveUrl: "#",
        codeUrl: "#",
        desc: "Conceived and programmed a local multi-game suite featuring classic arcade titles built entirely with custom heuristic bots matching client interactions.",
        features: [
            "Responsive GUI Hub Navigation",
            "Heuristic Algorithms (Minimax, AI Logic Bots)",
            "Tic-Tac-Toe, Snake, Rock-Paper-Scissors Games",
            "Dynamic High-Score Session Databases"
        ],
        team: [
            "Md. Sofiqul Islam (Solo Developer)"
        ],
        tech: ["Python", "Tkinter GUI Module", "AI Opponent Heuristics", "OOP"]
    }
};

function initProjectsFilterAndModal() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-detail-modal');
    const modalContent = document.getElementById('modal-dynamic-content');
    const modalClose = document.querySelector('.modal-close-btn');
    
    if (!modal || !modalContent) return;
    
    // 1. Filtering logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => { card.style.display = 'none'; }, 200);
                }
            });
        });
    });
    
    // 2. Open Modal logic
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('.open-modal-btn');
        if (!trigger) return;
        
        const projectId = trigger.getAttribute('data-project');
        const projData = projectDatabase[projectId];
        
        if (!projData) return;
        
        // Build modal markup
        let featuresHTML = '';
        projData.features.forEach(feat => {
            featuresHTML += `<li><i class="fa-solid fa-square-rss"></i> ${feat}</li>`;
        });
        
        let teamHTML = '';
        projData.team.forEach(memb => {
            const isLead = memb.includes("Lead") || memb.includes("Solo");
            teamHTML += `<span class="team-member-chip ${isLead ? 'lead-chip' : ''}"><i class="fa-solid ${isLead ? 'fa-user-shield' : 'fa-user'}"></i> ${memb}</span>`;
        });
        
        let techHTML = '';
        projData.tech.forEach(tag => {
            techHTML += `<span class="modal-tech-tag">${tag}</span>`;
        });
        
        const isLiveAvailable = projData.liveUrl !== '#';
        
        const markup = `
            <div class="modal-header-block">
                <span class="modal-category">${projData.category}</span>
                <h3 class="modal-title">${projData.title}</h3>
            </div>
            
            <div class="modal-meta-grid">
                <div class="meta-col">
                    <span class="meta-label">Role Assigned</span>
                    <span class="meta-value">${projData.role}</span>
                </div>
                <div class="meta-col">
                    <span class="meta-label">Project Duration</span>
                    <span class="meta-value">${projData.duration}</span>
                </div>
                <div class="meta-col">
                    <span class="meta-label">System Node</span>
                    <span class="meta-value">Stable</span>
                </div>
            </div>
            
            <div class="modal-body-section">
                <h4 class="modal-section-title">Overview Description</h4>
                <p class="modal-desc">${projData.desc}</p>
            </div>
            
            <div class="modal-body-section">
                <h4 class="modal-section-title">System Features</h4>
                <ul class="features-list">
                    ${featuresHTML}
                </ul>
            </div>
            
            <div class="modal-body-section">
                <h4 class="modal-section-title">Team Configuration</h4>
                <div class="modal-team-list">
                    ${teamHTML}
                </div>
            </div>
            
            <div class="modal-body-section">
                <h4 class="modal-section-title">Technologies Used</h4>
                <div class="modal-tech-bar">
                    ${techHTML}
                </div>
            </div>
            
            <div class="modal-actions-bar">
                ${isLiveAvailable ? `<a href="${projData.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fa-solid fa-link"></i> Launch Live System</a>` : ''}
                <a href="${projData.codeUrl}" class="btn btn-secondary btn-sm" onclick="alert('Repository is confidential or academic internal. Source files can be requested.'); return false;"><i class="fa-brands fa-github"></i> Repository Access</a>
            </div>
        `;
        
        modalContent.innerHTML = markup;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // lock scroll
    });
    
    // 3. Close Modal logic
    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // unlock scroll
    }
    
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close on Escape Key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   WORD2VEC MATHEMATICAL VECTOR VISUALIZER (Academic Research Widget)
   ========================================================================== */
function initWord2VecVisualizer() {
    const canvas = document.getElementById('word-vector-canvas');
    const queryButtons = document.querySelectorAll('.vector-query-btn');
    
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Setup coordinates for high definition
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    
    const datasets = {
        gender: {
            eq: ["King", "Man", "Woman", "Queen"],
            points: [
                { name: "Man", x: 45, y: 130, color: "#8892b0" },
                { name: "Woman", x: 145, y: 130, color: "#8892b0" },
                { name: "King", x: 65, y: 40, color: "#00d2ff" },
                { name: "Queen", x: 165, y: 40, color: "#00f2fe" }
            ],
            arrows: [
                { from: "Man", to: "King", type: "relation" },
                { from: "Woman", to: "Queen", type: "relation" },
                { from: "Man", to: "Woman", type: "shift" }
            ]
        },
        country: {
            eq: ["Paris", "France", "UK", "London"],
            points: [
                { name: "France", x: 50, y: 140, color: "#8892b0" },
                { name: "UK", x: 155, y: 120, color: "#8892b0" },
                { name: "Paris", x: 75, y: 55, color: "#00d2ff" },
                { name: "London", x: 180, y: 35, color: "#00f2fe" }
            ],
            arrows: [
                { from: "France", to: "Paris", type: "relation" },
                { from: "UK", to: "London", type: "relation" },
                { from: "France", to: "UK", type: "shift" }
            ]
        },
        verb: {
            eq: ["Walk", "Walking", "Swimming", "Walk"],
            eqText: ["Walk", "Walking", "Swimming", "Swim"],
            points: [
                { name: "Walk", x: 40, y: 120, color: "#8892b0" },
                { name: "Swim", x: 130, y: 145, color: "#00f2fe" },
                { name: "Walking", x: 90, y: 45, color: "#8892b0" },
                { name: "Swimming", x: 180, y: 70, color: "#00d2ff" }
            ],
            arrows: [
                { from: "Walk", to: "Walking", type: "relation" },
                { from: "Swim", to: "Swimming", type: "relation" },
                { from: "Walking", to: "Swimming", type: "shift" }
            ]
        }
    };
    
    let activeKey = 'gender';
    let animProgress = 0;
    
    function drawVectorSpace() {
        ctx.clearRect(0, 0, width, height);
        
        // 1. Draw axis lines
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 40; i < width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 30; i < height; i += 30) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }
        
        // Origin Axes
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(25, 0);
        ctx.lineTo(25, height - 20);
        ctx.lineTo(width, height - 20);
        ctx.stroke();
        
        const data = datasets[activeKey];
        
        // 2. Draw relationships arrows
        data.arrows.forEach(arrow => {
            const p1 = data.points.find(p => p.name === arrow.from);
            const p2 = data.points.find(p => p.name === arrow.to);
            if (!p1 || !p2) return;
            
            // Animating connection
            const currentX = p1.x + (p2.x - p1.x) * animProgress;
            const currentY = p1.y + (p2.y - p1.y) * animProgress;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(currentX, currentY);
            
            if (arrow.type === 'relation') {
                ctx.strokeStyle = 'rgba(0, 82, 212, 0.45)';
                ctx.setLineDash([4, 3]);
            } else {
                ctx.strokeStyle = 'rgba(0, 242, 254, 0.5)';
                ctx.setLineDash([]);
            }
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Draw tiny arrowhead at the destination if animated
            if (animProgress >= 0.95) {
                drawArrowhead(ctx, p1.x, p1.y, p2.x, p2.y, 6);
            }
        });
        
        // 3. Draw coordinate word vectors
        data.points.forEach(pt => {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = pt.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = pt.color;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
            
            // Label text
            ctx.font = '500 10.5px Fira Code';
            ctx.fillStyle = '#ccd6f6';
            ctx.fillText(pt.name, pt.x + 8, pt.y - 4);
        });
    }
    
    function drawArrowhead(context, fromx, fromy, tox, toy, r) {
        var x_center = tox;
        var y_center = toy;
        var angle = Math.atan2(toy - fromy, tox - fromx);
        var angle1 = angle + Math.PI / 6;
        var angle2 = angle - Math.PI / 6;
        
        context.beginPath();
        context.moveTo(tox, toy);
        context.lineTo(tox - r * Math.cos(angle1), toy - r * Math.sin(angle1));
        context.lineTo(tox - r * Math.cos(angle2), toy - r * Math.sin(angle2));
        context.closePath();
        context.fillStyle = 'rgba(0, 242, 254, 0.8)';
        context.fill();
    }
    
    function animateVectors() {
        if (animProgress < 1) {
            animProgress += 0.04;
            drawVectorSpace();
            requestAnimationFrame(animateVectors);
        } else {
            animProgress = 1;
            drawVectorSpace();
        }
    }
    
    // Click events mapping
    queryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            queryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeKey = btn.getAttribute('data-op');
            
            // Load equation details
            const eqData = datasets[activeKey];
            const displayWords = eqData.eqText ? eqData.eqText : eqData.eq;
            
            document.getElementById('box-v1').textContent = eqData.eq[0];
            document.getElementById('box-v2').textContent = eqData.eq[1];
            document.getElementById('box-v3').textContent = eqData.eq[2];
            document.getElementById('box-result').textContent = displayWords[3];
            
            // Reset & run animation
            animProgress = 0;
            animateVectors();
        });
    });
    
    // Initial paint
    animateVectors();
}

/* ==========================================================================
   VERTICAL TIMELINE ENGINE
   ========================================================================== */
function initTimelineTracker() {
    const timeline = document.querySelector('.timeline-container');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressBar = document.querySelector('.timeline-progress-bar');
    
    if (!timeline || !progressBar || timelineItems.length === 0) return;
    
    function trackTimelineProgress() {
        const rect = timeline.getBoundingClientRect();
        const sectionHeight = rect.height;
        
        // Percentage of section scrolled past top viewport boundary
        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight * 0.45;
        
        let progressHeight = triggerPoint - rect.top;
        if (progressHeight < 0) progressHeight = 0;
        if (progressHeight > sectionHeight) progressHeight = sectionHeight;
        
        const pct = (progressHeight / sectionHeight) * 100;
        progressBar.style.height = `${pct}%`;
        
        // Activate nodes based on progress height
        timelineItems.forEach(item => {
            const itemOffset = item.offsetTop;
            if (progressHeight >= itemOffset - 10) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', trackTimelineProgress);
}

/* ==========================================================================
   GITHUB CONTRIBUTION GRAPH (Cyberpunk Mock Calendar)
   ========================================================================== */
function initGitHubGrid() {
    const grid = document.getElementById('github-contributions-grid');
    if (!grid) return;
    
    const cellCount = 371; // 53 weeks x 7 days
    
    // Generate realistic activity grid leveraging random level clumps
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.classList.add('git-cell');
        
        // Algorithmic weight to mock real commit intensities (sprints/gaps)
        let level = 0;
        const rand = Math.random();
        
        // Sine wave noise to create clumps of commits (active periods)
        const activityWave = Math.sin(i / 15) * Math.cos(i / 8) + 0.3;
        
        if (activityWave > 0.8 && rand > 0.2) {
            level = Math.floor(Math.random() * 2) + 3; // level 3 or 4 (sprints)
        } else if (activityWave > 0.4 && rand > 0.4) {
            level = Math.floor(Math.random() * 2) + 1; // level 1 or 2 (moderate activity)
        } else if (rand > 0.85) {
            level = 1; // background minor edits
        } else {
            level = 0; // quiet periods
        }
        
        cell.classList.add(`level-${level}`);
        
        // Mock Tooltips counts
        let commits = 0;
        if (level === 1) commits = Math.floor(Math.random() * 2) + 1;
        if (level === 2) commits = Math.floor(Math.random() * 3) + 3;
        if (level === 3) commits = Math.floor(Math.random() * 3) + 6;
        if (level === 4) commits = Math.floor(Math.random() * 6) + 9;
        
        const dateOffset = cellCount - i;
        const date = new Date();
        date.setDate(date.getDate() - dateOffset);
        const dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        
        const tooltipStr = commits > 0 ? `${commits} commits on ${dateStr}` : `No commits on ${dateStr}`;
        cell.setAttribute('title', tooltipStr);
        
        grid.appendChild(cell);
    }
}

/* ==========================================================================
   CONTACT FORM SUBMISSION WITH ANTI-BOT VERIFICATION SLIDER
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const handle = document.getElementById('form-slider-handle');
    const track = document.querySelector('.slider-filled-track');
    const sliderContainer = document.querySelector('.verification-slider-container');
    const verifiedInput = document.getElementById('slider-verified');
    const submitBtn = document.querySelector('.form-submit-btn');
    const responseMsg = document.getElementById('form-response-msg');
    
    if (!form || !handle || !sliderContainer) return;
    
    let isDragging = false;
    let startX = 0;
    let containerWidth = sliderContainer.clientWidth;
    let maxDistance = containerWidth - 50; // handle is 50px wide
    
    // Auto handle container resize
    window.addEventListener('resize', () => {
        containerWidth = sliderContainer.clientWidth;
        maxDistance = containerWidth - 50;
    });
    
    function startDrag(e) {
        if (verifiedInput.value === 'true') return;
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        handle.style.transition = 'none';
        track.style.transition = 'none';
    }
    
    function drag(e) {
        if (!isDragging) return;
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        let deltaX = currentX - startX;
        
        if (deltaX < 0) deltaX = 0;
        if (deltaX > maxDistance) deltaX = maxDistance;
        
        handle.style.left = `${deltaX}px`;
        track.style.width = `${deltaX + 25}px`; // half handle offset
        
        // Complete Verification threshold
        if (deltaX >= maxDistance - 2) {
            verifyHuman();
        }
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        if (verifiedInput.value !== 'true') {
            // Slide back if incomplete
            handle.style.transition = 'left 0.3s ease-out';
            track.style.transition = 'width 0.3s ease-out';
            handle.style.left = '0px';
            track.style.width = '0px';
        }
    }
    
    function verifyHuman() {
        verifiedInput.value = 'true';
        isDragging = false;
        sliderContainer.classList.add('verified');
        submitBtn.removeAttribute('disabled');
        
        // Disable slider mouse actions
        handle.style.left = '';
        track.style.width = '';
        handle.removeEventListener('mousedown', startDrag);
        handle.removeEventListener('touchstart', startDrag);
    }
    
    // Event bindings
    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag);
    
    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);
    
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
    
    // Form submission simulation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Basic validation
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showStatus('All communication channels must be fully populated.', 'error');
            return;
        }
        
        if (verifiedInput.value !== 'true') {
            showStatus('Neural interface verification required.', 'error');
            return;
        }
        
        // Disable submit button
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.innerHTML = `<i class="fa-solid fa-sync fa-spin"></i> Transmitting Signal...`;
        
        setTimeout(() => {
            showStatus('SIGNAL STABLE. Packet transmitted successfully! Sofiqul will connect with you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset verification slider
            verifiedInput.value = 'false';
            sliderContainer.classList.remove('verified');
            handle.style.left = '0px';
            track.style.width = '0px';
            
            // Re-bind slider drag controls
            handle.addEventListener('mousedown', startDrag);
            handle.addEventListener('touchstart', startDrag);
            
            submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Initialize Transmission`;
        }, 1500);
    });
    
    function showStatus(msg, type) {
        responseMsg.className = `form-status-msg ${type}`;
        responseMsg.textContent = msg;
        
        setTimeout(() => {
            responseMsg.className = 'form-status-msg';
            responseMsg.textContent = '';
        }, 6000);
    }
}
