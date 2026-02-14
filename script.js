<script>
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent automatic prompt
    e.preventDefault();
    deferredPrompt = e;

    // Show install button
    installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
    installBtn.style.display = "none";
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
            console.log("App installed");
        } else {
            console.log("App installation dismissed");
        }
        deferredPrompt = null;
    }
});
</script>

// =======================
// PASSWORD CHECK
// =======================
function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    if (password === "love123") {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');

        // Play background music
        const music = document.getElementById('bgMusic');
        music.play().catch(() => { console.log("Autoplay blocked"); });

        // Start first typing message
        typeMessage("Happy Birthday Unisha ❤️", "typing", 100, showPhotoSection);
    } else {
        document.getElementById('error').textContent = "Incorrect! 💔 Try again.";
    }
}

// =======================
// TYPING EFFECT
// =======================
function typeMessage(message, elementId, speed = 100, callback) {
    let i = 0;
    const el = document.getElementById(elementId);
    el.textContent = "";
    const interval = setInterval(() => {
        if (i < message.length) {
            el.textContent += message.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

// =======================
// FLOATING HEARTS
// =======================
function launchHearts() {
    const container = document.getElementById('hearts');
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 2 + Math.random() * 3 + "s";
        heart.textContent = "❤️";
        container.appendChild(heart);
    }
}

// =======================
// FIREWORKS
// =======================
function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        const hue = Math.random() * 360;
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                alpha: 1,
                color: `hsl(${hue}, 100%, 50%)`,
                size: Math.random() * 3 + 2
            });
        }
    }

    function animateParticles() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.01;
            ctx.fillStyle = `hsla(${p.color.match(/\d+/g)[0]},100%,50%,${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            if (p.alpha <= 0) particles.splice(i, 1);
        }

        requestAnimationFrame(animateParticles);
    }

    setInterval(createFirework, 500);
    animateParticles();
}

// =======================
// PHOTO SECTION (3 actual photos)
// =======================
const photos = ["photo1.jpg", "photo2.jpg", "photo3.jpg"];
let currentPhotoIndex = 0;

function showPhotoSection() {
    const section = document.getElementById('photoSection');
    section.classList.remove('hidden');
    showNextPhoto();
}

function showNextPhoto() {
    const display = document.getElementById('photoDisplay');
    if (currentPhotoIndex < photos.length) {
        const img = document.createElement('img');
        img.src = photos[currentPhotoIndex];
        img.style.width = "250px";
        img.style.height = "auto";
        img.style.borderRadius = "15px";
        img.style.cursor = "pointer";
        display.innerHTML = "";
        display.appendChild(img);

        currentPhotoIndex++;

        img.onclick = () => {
            img.onclick = null;
            if (currentPhotoIndex < photos.length) {
                showNextPhoto();
            } else {
                // Show cake button after last photo
                document.getElementById('cakeSection').classList.remove('hidden');
            }
        };
    }
}

// =======================
// CAKE BUTTON
// =======================
document.getElementById('cakeBtn').onclick = () => {
    document.getElementById('cakeSection').style.display = "none";

    typeMessage("Happy Birthday Unisha! 🎉 From Vivek 💖", "typing", 100, () => {
        launchHearts();
        startFireworks();

        // Show middle message
        typeMessage("Only three photos of ours, 3 years completed together, and many more to...", "typing", 50, () => {
            document.getElementById('nextSection').classList.remove('hidden');
        });
    });
}

// =======================
// NEXT BUTTON CLICK
// =======================
document.getElementById('nextBtn').onclick = () => {
    document.getElementById('nextSection').style.display = "none";
    typeMessage("Sorry this much for today, will do more in coming years... 💕", "typing", 100);
}

// Start background fireworks immediately for effect
startFireworks();
