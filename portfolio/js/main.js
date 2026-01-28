const text = "Kornel";
let index = 0;
const typedTextElement = document.getElementById('typedText');

function type() {
    if (index < text.length) {
        typedTextElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 150);
    }
}

setTimeout(type, 500);

const clickTracking = {

    storageKey: 'project_clicks',
    
    init() {
        if (!localStorage.getItem(this.storageKey)) {
            const initialData = {};
            projects.forEach(project => {
                initialData[project.id] = 0;
            });
            localStorage.setItem(this.storageKey, JSON.stringify(initialData));
        }
    },
    
    trackClick(projectId, projectTitle) {
        const data = JSON.parse(localStorage.getItem(this.storageKey)) || {};
        data[projectId] = (data[projectId] || 0) + 1;
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        
        console.log(`Project clicked: ${projectTitle} (ID: ${projectId}) - Total clicks: ${data[projectId]}`);
        
        this.sendToAnalytics(projectId, projectTitle, data[projectId]);
    },
    
    sendToAnalytics(projectId, projectTitle, clickCount) {
    },
    
    getStats() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    },
    
    getClicks(projectId) {
        const data = this.getStats();
        return data[projectId] || 0;
    },
    
    reset() {
        const initialData = {};
        projects.forEach(project => {
            initialData[project.id] = 0;
        });
        localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
};

const projects = [
    {
        id: 1,
        title: "Advanced Gun System",
        video: "https://www.youtube.com/embed/rbrT2_OgdY0",
        tags: ["Combat", "Gun", "Advanced"],
        allTags: ["Combat", "Guns", "Optimization", "Anti-Exploit", "DataStore"],
        description: "A feature rich gun system including: recoil, bullet spread, mastery system, wall penetration, hit markers, diff damage for bodyparts + checks for related exploits.",
        date: "December, 2025",
        tools: ["Luau", "Roblox Studio", "Roblox API"]
    },
    {
        id: 2,
        title: "Advanced Anti-Cheat, Catalyst",
        video: "https://www.youtube.com/embed/g7mGGSYmyrQ",
        tags: ["Anti-Cheat", "Exploit Detections"],
        allTags: ["Luau", "Roblox API", "Exploit Detections", "Data Storing", "Optimization"],
        description: "Advanced anti-cheat detecting lots of exploits including: Fly, Bhop, NoClip, Speed, ESP, Aimbot, Silent Aim and a lot more. The anti-cheat also includes advanced configurating and data storing. By default it autobans and the output for both flags and bans are integrated through a discord webhook url and soon my website. In the video only a few detections of the anti-cheat is showcased due to my laziness",
        date: "In Development",
        tools: ["Luau", "Roblox API","NodeJS Server", "MongoDB"]
    },
    {
        id: 3,
        title: "Catalyst Web Dashboard",
        video: "https://www.youtube.com/embed/onDUKyJazjo",
        tags: ["Frontend", "Backend", "Data Storing", "Auth System"],
        allTags: ["Frontend", "Backend", "Data Storing", "Auth System", "Database"],
        description: "An advanced website designed for my anti-cheat, it includes an authentication system, account creation and management, API key creation and management, soon it will have the detections integrated and more.",
        date: "In Development",
        tools: ["MongoDB", "Thunder Client", "NodeJS"]
    },
    {
        id: 4,
        title: "Drawing Terrain Generation",
        video: "https://www.youtube.com/embed/PAsa4qJ6VAw",
        tags: ["Math", "Physics", "Drawing"],
        allTags: ["Luau", "Terrain", "Voxel", "Dynamic", "Optimization"],
        description: "This project uses advanced mathematics/arithmetics and physics alongside advanced Roblox API to create a little drawing mechanism using the cursor. The generated terrain automatically fades away after 5 seconds. The terrain generator also uses Voxel manipulation.",
        date: "November, 2025",
        tools: ["Advanced Maths", "Advanced Physics", "Roblox API", "Luau"]
    },
    {
        id: 5,
        title: "Movement Mirror AI",
        video: "https://www.youtube.com/embed/qQmxWj1IBH0",
        tags: ["Math", "Physics", "CMake","Movement"],
        allTags: ["Math", "Physics", "CMake", "AI", "Movement"],
        description: "An AI created to 1:1 mirror the player's every movement and rotation. It works almost flawlessly, but for some reason roblox breaks when I try to do this with an R15 rig, it worked with R6 but that just looked ugly.",
        date: "January, 2026",
        tools: ["CMake", "Roblox API", "Math"]
    },
    {
        id: 6,
        title: "Platform Generator",
        video: "https://www.youtube.com/embed/xv1rQAVPtc8",
        tags: ["Math", "Physics", "CMake", "Kinda Cool"],
        allTags: ["Math", "Physics", "CMake", "Terrain"],
        description: "A cool little project of mine, basically wherever the player moves it generates a platform below them to keep them from falling.",
        date: "January, 2026",
        tools: ["CMake", "Roblox API", "Math"]
    },
    {
        id: 7,
        title: "Advanced Authentication",
        video: "https://www.youtube.com/embed/2hKIzWWY9Kk",
        tags: ["Authentication", "Secure", "Advanced"],
        allTags: ["Authentication", "Secure", "Email", "Advanced"],
        description: "An advanced authentication system that lets the user decide how they want to be authenticated. Currently available: user+pass, email+pass, email+code. Phone number soon.",
        date: "In Development",
        tools: ["NodeJs", "NodeMail", "MongoDB"]
    }
];

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projects.map(project => {
        const clicks = clickTracking.getClicks(project.id);
        return `
            <div class="project-card" data-project-id="${project.id}">
                <div class="video-container">
                    ${project.video ? 
                        `<iframe src="${project.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%;"></iframe>` :
                        `<div class="video-placeholder">
                            <i class="fas fa-play-circle"></i>
                        </div>`
                    }
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="contains-label">Contains</p>
                <div class="tags-container">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="details-btn" onclick="openModal(${project.id}); event.stopPropagation();">
                    <i class="fas fa-info-circle"></i> See Details
                </button>
            </div>
        `;
    }).join('');
}

function updateClickCounter(projectId) {
    const counter = document.querySelector(`.click-counter[data-project-id="${projectId}"] .click-count`);
    if (counter) {
        const clicks = clickTracking.getClicks(projectId);
        counter.textContent = clicks;
        
        counter.parentElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            counter.parentElement.style.transform = 'scale(1)';
        }, 200);
    }
}

function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    clickTracking.trackClick(projectId, project.title);
    
    updateClickCounter(projectId);

    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalDate').textContent = project.date;
    
    const toolsList = document.getElementById('modalTools');
    toolsList.innerHTML = project.tools.map(tool => 
        `<li><i class="fas fa-wrench"></i> ${tool}</li>`
    ).join('');

    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = project.allTags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');

    const modalVideo = document.getElementById('modalVideo');
    if (project.video) {
        modalVideo.innerHTML = `<iframe src="${project.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%;"></iframe>`;
    } else {
        modalVideo.innerHTML = `<div class="video-placeholder">
            <i class="fas fa-play-circle"></i>
        </div>`;
    }

    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
}

clickTracking.init();
renderProjects();
