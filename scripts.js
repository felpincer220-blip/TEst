/* script.js - interactions adapted from professor style, cleaned */

/* -------------------------
   Smooth scroll with offset
   ------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // close mobile menu if open
      const navC = document.getElementById('navLinks');
      if(navC && navC.classList.contains('show')) navC.classList.remove('show');
    }
  });
});

/* -------------------------
   Nav toggle mobile
   ------------------------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if(navToggle && navLinks){
  navToggle.addEventListener('click', ()=> navLinks.classList.toggle('show'));
}

/* -------------------------
   Sticky nav color change on scroll
   ------------------------- */
const header = document.querySelector('.header-container');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 30) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

/* -------------------------
   Reveal cards on scroll
   ------------------------- */
const cards = document.querySelectorAll('.card');
const cardObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{ threshold: 0.12 });
cards.forEach(c => cardObserver.observe(c));

/* -------------------------
   Timeline items reveal
   ------------------------- */
const timelineItems = document.querySelectorAll('.timeline-item');
const tlObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('fade-in');
  });
},{ threshold: 0.45 });
timelineItems.forEach(i => tlObserver.observe(i));

/* -------------------------
   Back-to-top
   ------------------------- */
const backBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', ()=> {
  if(window.scrollY > 300) backBtn.style.display = 'flex';
  else backBtn.style.display = 'none';
});
backBtn.addEventListener('click', ()=> window.scrollTo({ top: 0, behavior: 'smooth' }));

/* -------------------------
   Prompt demo (simple)
   ------------------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  const send = document.getElementById('send-button');
  const responseBox = document.getElementById('response-box');
  const loading = document.getElementById('loading-dots');
  const responseText = document.getElementById('response-text');

  const demoResponse = `Je suis curieux, organisé et orienté projet : j’ai géré des événements, coordonné des équipes et je me forme aujourd’hui vers l’IA pour allier technique et produit.`;

  if(send){
    send.addEventListener('click', ()=>{
      send.disabled = true;
      responseBox.style.display = 'block';
      loading.style.display = 'inline-block';
      responseText.style.display = 'none';
      setTimeout(()=> {
        loading.style.display = 'none';
        responseText.style.display = 'block';
        responseText.innerHTML = demoResponse;
        send.disabled = false;
      }, 1200);
    });
  }
});

/* -------------------------
   Particle system (canvas) - lightweight
   ------------------------- */
(function(){
  const canvas = document.getElementById('particleCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;
  const particles = [];
  let raf = null;

  function resize(){ w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize);

  function create(){
    return {
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-0.5)*0.6,
      vy: - (Math.random()*0.8 + 0.2),
      r: Math.random()*1.6 + 0.6,
      a: Math.random()*0.6 + 0.2
    };
  }
  for(let i=0;i<40;i++) particles.push(create());

  function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach((p,i)=>{
      ctx.beginPath();
      ctx.globalAlpha = p.a;
      ctx.fillStyle = '#dbeafe';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if(p.y < -30 || p.x < -50 || p.x > w+50) particles[i] = create();
    });
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }

  // observe special section to start/stop
  const special = document.getElementById('special-section');
  if(!special){ draw(); return; }
  const ob = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !raf) draw();
      if(!entry.isIntersecting && raf){ cancelAnimationFrame(raf); raf = null; ctx.clearRect(0,0,w,h); }
    });
  }, { threshold: 0.25 });
  ob.observe(special);
})();

/* -------------------------
   EmailJS contact form (PLACEHOLDER keys)
   ------------------------- */
/* To use EmailJS:
   - create account on emailjs.com
   - create service and template
   - replace placeholders below with your IDs
*/
const EMAILJS_USER_ID = 'YOUR_EMAILJS_USER_ID';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

document.addEventListener('DOMContentLoaded', function () {
  // init only if user provided
  if(typeof emailjs !== 'undefined' && EMAILJS_USER_ID !== 'YOUR_EMAILJS_USER_ID'){
    try{ emailjs.init(EMAILJS_USER_ID); } catch(e){ console.warn('EmailJS init failed', e); }
  }

  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('status');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();

    // if EmailJS not configured, show warning and reset (local)
    if(typeof emailjs === 'undefined' || EMAILJS_USER_ID === 'YOUR_EMAILJS_USER_ID'){
      statusDiv.innerHTML = `<div class="alert alert-danger">Formulaire non configuré — remplacez les identifiants EmailJS dans <code>script.js</code>.</div>`;
      setTimeout(()=> statusDiv.innerHTML = '', 5000);
      form.reset();
      return;
    }

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
      .then(()=> {
        statusDiv.innerHTML = `<div class="alert alert-success">Message envoyé — merci !</div>`;
        form.reset();
        setTimeout(()=> statusDiv.innerHTML = '', 5000);
      })
      .catch(err => {
        console.error('EmailJS error', err);
        statusDiv.innerHTML = `<div class="alert alert-danger">Erreur — réessayez plus tard.</div>`;
        setTimeout(()=> statusDiv.innerHTML = '', 5000);
      });
  });
});
