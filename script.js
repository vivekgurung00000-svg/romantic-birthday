// =======================
// PASSWORD CHECK
// =======================
function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    if (password === "love123") { // your secret code
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('bgMusic').play();
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
// SHOW PHOTO BUTTON FUNCTION
// =======================
function showPhoto(filename) {
    const display = document.getElementById('photoDisplay');
    display.innerHTML = `<img src="${filename}">`;
}

// =======================
// FIREWORKS + SPARKLING FINAL MESSAGE
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
            ctx.fillStyle = `hsla(${p.color.match(/\d+/g)[0]}, 100%, 50%, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            if (p.alpha <= 0) particles.splice(i, 1);
        }

        requestAnimationFrame(animateParticles);
    }

    let fireworkCount = 0;
    const fireworkInterval = setInterval(() => {
        createFirework();
        fireworkCount++;
        if (fireworkCount >= 15) {
            clearInterval(fireworkInterval);
            setTimeout(showBirthdayMessage, 1000);
        }
    }, 500);

    animateParticles();

    function showBirthdayMessage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const message = "🎉 Happy Birthday Unisha! 🎉";
        const quote = "💖 You are my today and all of my tomorrows 💖";

        let sparkles = [];
        const textX = canvas.width / 2;
        const textY = canvas.height / 2;

        ctx.font = "bold 80px Arial";
        ctx.textAlign = "center";

        for (let i = 0; i < 300; i++) {
            sparkles.push({
                x: textX + (Math.random() - 0.5) * ctx.measureText(message).width,
                y: textY + (Math.random() - 0.5) * 80,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                alpha: Math.random(),
                size: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 360}, 100%, 70%)`
            });
        }

        function animateText() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#ff3399";
            ctx.font = "bold 80px Arial";
            ctx.fillText(message, textX, textY);

            ctx.fillStyle = "#ff99cc";
            ctx.font = "bold 40px Arial";
            ctx.fillText(quote, textX, textY + 100);

            sparkles.forEach(s => {
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.alpha;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();

                s.x += s.vx;
                s.y += s.vy;
                s.alpha -= 0.005;
                if (s.alpha <= 0) s.alpha = Math.random();
            });
            ctx.globalAlpha = 1;

            requestAnimationFrame(animateText);
        }

        animateText();
    }
}

// =======================
// MAIN FUNCTION
// =======================
function startRomance() {
    typeMessage("Happy Birthday Unisha ❤️", "typing", 100, () => {
        document.getElementById('photoSection').classList.remove('hidden');
        typeMessage("3 Years Completed Together 💕", "typing", 100, () => {
            launchHearts();
            startFireworks();
        });
    });
}
