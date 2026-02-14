const correctPassword = "17FEB";

function checkPassword() {
    const input = document.getElementById("passwordInput").value;
    if (input === correctPassword) {
        document.getElementById("loginScreen").classList.add("hidden");
        document.getElementById("mainContent").classList.remove("hidden");
        document.getElementById("title").innerText = "Happy Birthday My Love ❤️";
    } else {
        document.getElementById("error").innerText = "Wrong Password 💔";
    }
}

const message = "You are the most beautiful part of my life. I’m so lucky to celebrate you today and forever. ❤️";
let i = 0;

function typeWriter() {
    if (i < message.length) {
        document.getElementById("typing").innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

function startRomance() {
    document.getElementById("bgMusic").play();
    document.getElementById("gallery").classList.remove("hidden");
    typeWriter();
    launchFireworks();
}

/* FLOATING HEARTS */

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    document.getElementById("hearts").appendChild(heart);
    setTimeout(() => { heart.remove(); }, 7000);
}

setInterval(createHeart, 400);

/* FIREWORKS */

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework(x,y){
    for(let i=0;i<70;i++){
        particles.push({
            x,y,
            angle:Math.random()*2*Math.PI,
            speed:Math.random()*5+2,
            life:100
        });
    }
}

function launchFireworks(){
    setInterval(()=>{
        createFirework(Math.random()*canvas.width,Math.random()*canvas.height/2);
    },800);
    animate();
}

function animate(){
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,index)=>{
        p.x+=Math.cos(p.angle)*p.speed;
        p.y+=Math.sin(p.angle)*p.speed;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x,p.y,2,0,Math.PI*2);
        ctx.fillStyle="#ff4da6";
        ctx.fill();

        if(p.life<=0) particles.splice(index,1);
    });

    requestAnimationFrame(animate);
}

