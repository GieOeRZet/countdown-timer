// --- data docelowa ---
const targetDate = new Date(2025, 9, 22, 10, 50, 0);

// --- flip clock ---
const cards = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) { startCelebration(); return; }

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff/(1000*60*60))%24);
  const m = Math.floor((diff/(1000*60))%60);
  const s = Math.floor((diff/1000)%60);

  updateCard(cards.days, d);
  updateCard(cards.hours, h);
  updateCard(cards.minutes, m);
  updateCard(cards.seconds, s);
}
function updateCard(card, newValue){
  const val=newValue.toString().padStart(2,"0");
  if(card.textContent!==val){
    card.classList.add("flip");
    setTimeout(()=>{card.textContent=val;card.classList.remove("flip");},350);
  }
}

// --- zegar analogowy ---
const hourHand=document.getElementById("hour-hand");
const minuteHand=document.getElementById("minute-hand");
const secondHand=document.getElementById("second-hand");
function updateAnalogClock(){
  const now=new Date();
  const s=now.getSeconds(), m=now.getMinutes(), h=now.getHours()%12;
  const sDeg=s*6, mDeg=m*6+s*0.1, hDeg=h*30+m*0.5;
  hourHand.style.transform=`translate(-50%,-100%) rotate(${hDeg}deg)`;
  minuteHand.style.transform=`translate(-50%,-100%) rotate(${mDeg}deg)`;
  secondHand.style.transform=`translate(-50%,-100%) rotate(${sDeg}deg)`;
}

// --- realistyczne fajerwerki / konfetti ---
const analogClock=document.getElementById("analogClock");
const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");
canvas.width=400;canvas.height=400;
let particles=[];
function rand(min,max){return Math.random()*(max-min)+min;}

function createExplosion(x,y,color){
  for(let i=0;i<80;i++){
    particles.push({
      x,y,
      vx:Math.cos((Math.PI*2*i)/80)*rand(1,5),
      vy:Math.sin((Math.PI*2*i)/80)*rand(1,5),
      alpha:1,
      radius:rand(1,3),
      color
    });
  }
}

function animateFireworks(){
  ctx.fillStyle="rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    p.x+=p.vx; p.y+=p.vy; p.vy+=0.02;
    p.alpha-=0.01;
    ctx.beginPath();
    ctx.fillStyle=`hsla(${p.color},100%,60%,${p.alpha})`;
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fill();
    if(p.alpha<=0) particles.splice(i,1);
  });
  if(Math.random()<0.05){
    createExplosion(rand(50,350),rand(100,200),rand(0,360));
  }
  requestAnimationFrame(animateFireworks);
}

// --- start świętowania ---
function startCelebration(){
  analogClock.classList.add("hidden");
  canvas.classList.remove("hidden");
  animateFireworks();
}

// --- inicjalizacja ---
setInterval(updateTimer,1000);
setInterval(updateAnalogClock,1000);
updateTimer();updateAnalogClock();
