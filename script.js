document.addEventListener("DOMContentLoaded", () => {

    // ===== THEME TOGGLE =====
    const toggle = document.getElementById('themeToggle');
    const body = document.body;

    toggle.addEventListener('click', () => {
        body.classList.toggle('light');
        toggle.textContent = body.classList.contains('light')
            ? '🌙 Dark Mode'
            : '☀️ Light Mode';
    });

    //about me toggle handled 

    const aboutToggle = document.getElementById("aboutToggle");
    const backToProjects = document.getElementById("backToProjects");
    const projectsSection = document.getElementById("projects-section");
    const aboutSection = document.getElementById("about-section");

    aboutToggle.addEventListener("click", () => {
        projectsSection.classList.add("hidden");

        aboutSection.classList.remove("hidden");
        aboutSection.classList.add("show");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToProjects.addEventListener("click", () => {
        aboutSection.classList.remove("show");
        setTimeout(() => {
            aboutSection.classList.add("hidden");
        }, 400); // match with CSS transition duration
        projectsSection.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }); 

    // ===== CLICKABLE STARS =====
    const starCount = 18;
    const messages = [
        "♒ Aquarius energy activated",
        "✨ You found a star secret",
        "🌌 Coding the cosmos",
        "🌊 Flow state unlocked",
        "🔮 Creative vibes only",
        "🚀 Dream big"
    ];
    const messageBox = document.getElementById("easter-message");

    function showMessage(text) {
        messageBox.textContent = text;
        messageBox.classList.add("show");
        setTimeout(() => messageBox.classList.remove("show"), 2000);
    }

    const starsArray = [];
    for(let i=0; i<starCount; i++){
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = Math.random()*100 + "vw";
        star.style.animationDuration = 30 + Math.random()*20 + "s"; // slower
        star.style.animationDelay = Math.random()*5 + "s";
        star.onclick = () => {
            const msg = messages[Math.floor(Math.random()*messages.length)];
            showMessage(msg);
        };
        document.body.appendChild(star);
        starsArray.push(star);
    }

    // ===== CONSTELLATION LINES =====
    const canvas = document.getElementById("constellation");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function drawConstellations() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        const positions = starsArray.map(star => {
            const rect = star.getBoundingClientRect();
            return { x: rect.left + rect.width/2, y: rect.top + rect.height/2 };
        });

        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        for(let i=0; i<positions.length; i++){
            for(let j=i+1; j<positions.length; j++){
                const dx = positions[i].x - positions[j].x;
                const dy = positions[i].y - positions[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < 150){
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(positions[i].x, positions[i].y);
                    ctx.lineTo(positions[j].x, positions[j].y);
                    ctx.stroke();
                }
            }
        }
    }

   function animateConstellations() {
        drawConstellations();
        requestAnimationFrame(animateConstellations);
    }
    animateConstellations();    
});
