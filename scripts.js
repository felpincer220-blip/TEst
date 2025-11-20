document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("NhW_jF2ZV7q2sGhfA");

    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        emailjs.sendForm('service_8pa7eue', 'template_0zf4nxa', this)
            .then(() => {
                // Afficher une alerte succès
                statusDiv.innerHTML = `<div class="alert alert-success" role="alert">Votre message a été envoyé avec succès !</div>`;

                // Réinitialiser le formulaire
                form.reset();

                // Supprimer l'alerte après quelques secondes
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            })
            .catch((error) => {
                console.error('FAILED...', error);

                // Afficher une alerte d'échec
                statusDiv.innerHTML = `<div class="alert alert-danger" role="alert">Une erreur s'est produite. Veuillez réessayer plus tard.</div>`;

                // Supprimer l'alerte après quelques secondes
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            });
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const timelineItems = document.querySelectorAll(".timeline-item");

    // Observe each timeline item and add the animation when it's in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
//chat gpt style prompt
document.addEventListener("DOMContentLoaded", function () {
  const responseText =
      `Ingénieur pédagogique avec plus de 5 ans d’expérience, j’ai pu construire mon expertise pluridisciplinaire autour de la transformation numérique, la pédagogie et l'accompagnement au changement.<br> 
      J'analyse le travail des équipes pédagogiques pour optimiser leurs pratiques, en prenant en compte aussi bien les processus que les outils. <br>
      Mon objectif est d’intégrer des solutions efficaces, pédagogiques ou techniques, pour faciliter toute la chaîne.`;
  const responseElement = document.getElementById("response-text");
  const responseBox = document.getElementById("response-box");
  const loadingDots = document.getElementById("loading-dots");
  const sendButton = document.getElementById("send-button");

  sendButton.addEventListener("click", function () {
      sendButton.disabled = true; // Désactiver le bouton après le clic
      responseBox.style.display = "block"; // Montrer la boîte de réponse
      loadingDots.style.display = "inline-block"; // Afficher les points de chargement

      // Simuler un délai avant de montrer la réponse
      setTimeout(function () {
          loadingDots.style.display = "none"; // Cacher les points de chargement
          responseElement.style.display = "inline-block"; // Afficher le texte de réponse
          responseElement.innerHTML = responseText;
      }, 1500); // Délai de 1,5 secondes
  });
});




// Smooth scroll for internal links with offset and collapse navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
      e.preventDefault();

      const targetElement = document.querySelector(this.getAttribute("href"));
      const offset = 75; // Décalage de 100px depuis le haut (ajustez selon vos besoins)

      if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;

          // Scroll avec décalage
          window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
          });

          // Collapse navbar if open
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
              const navbarToggler = document.querySelector(".navbar-toggler");
              if (navbarToggler) {
                  navbarToggler.click(); // Simule un clic pour refermer la navbar
              }
          }
      }
  });
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}


document.addEventListener("DOMContentLoaded", function() {
// Obtenir les couleurs à partir des variables CSS
const rootStyles = getComputedStyle(document.documentElement);
const backgroundColorDefault = rootStyles.getPropertyValue("--secondary-light").trim();
const textColorDefault = rootStyles.getPropertyValue("--primary").trim();
const backgroundColorDark = rootStyles.getPropertyValue("--primary").trim();
const textColorLight = rootStyles.getPropertyValue("--secondary-light").trim();
const cardColorDefault = rootStyles.getPropertyValue("--light-green").trim();
const cardColorDark = rootStyles.getPropertyValue("--dark-corail").trim();
const borderColorDefault = rootStyles.getPropertyValue("--sage-green").trim();
const borderColorDark = rootStyles.getPropertyValue("--light-corail").trim();
const backModalColorDark = rootStyles.getPropertyValue("--tech-violet").trim();
const ModalColorDefaut = rootStyles.getPropertyValue("--secondary-light").trim();
// Variables pour le contexte du canvas et les particules
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
const particles = [];
let animationFrame;

// Redimensionne le canvas pour remplir toute la section
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Fonction pour créer une particule
function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speedX: (Math.random() - 0.5) * 2,
    speedY: Math.random() * -2 - 1,
    size: Math.random() * 2 + 1,
    opacity: Math.random()
  };
}

// Ajoute des particules au tableau
function addParticles() {
  for (let i = 0; i < 12; i++) {
    particles.push(createParticle());
  }
}

// Dessine les particules sur le canvas
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
    ctx.fill();

    // Mise à jour de la position de la particule
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Réinitialise la particule si elle dépasse les limites
    if (particle.y < 0 || particle.x < 0 || particle.x > canvas.width) {
      particles[index] = createParticle();
    }
  });
}

// Fonction d'animation pour les particules
function animateParticles() {
  drawParticles();
  animationFrame = requestAnimationFrame(animateParticles);
}


// Gère le scroll pour appliquer les effets de changement de couleur et d'activation des particules

window.onscroll = debounce(function () {
  const specialSection = document.getElementById("special-section");

  if (specialSection) {
    const rect = specialSection.getBoundingClientRect();

    // Point de déclenchement basé sur la hauteur de la fenêtre
    const triggerOffset = window.innerHeight / 10; // 1/3 de la hauteur de l'écran

    // Vérifie si la section spéciale est proche du centre ou du tiers de l'écran
    if (
      rect.top <= window.innerHeight / 2 + triggerOffset &&
      rect.bottom >= window.innerHeight / 2 //- triggerOffset
    ) {
      let sectionHeight = specialSection.offsetHeight - 2 * triggerOffset;
      let scrollPositionInSection = window.scrollY - specialSection.offsetTop - triggerOffset;
      let scrollPercent = Math.min(Math.max(scrollPositionInSection / sectionHeight, 0),1);

      // Applique l'effet de fond sombre et texte clair au body
      document.body.style.backgroundColor = `rgba(${hexToRgb(backgroundColorDark)})`;
      document.body.style.color = `rgb(${hexToRgb(textColorLight)})`;
      //et aux cards
      document.querySelectorAll("#peda-projects .peda-card").forEach((card) => {
        card.style.backgroundColor = cardColorDark;
        card.style.borderColor = borderColorDark;
      })
      document.querySelectorAll(".tech-modal .modal-content").forEach((modal) => {
        modal.style.backgroundColor = backModalColorDark;
        modal.style.borderColor = ModalColorDefaut;
      });

      // Démarre l'animation des particules si elle n'est pas déjà en cours
      if (!animationFrame) {
        animateParticles();
      }
    } else {
      // Réinitialise le style en dehors de la section spéciale
      resetStyles();
    }
  } else {
    // Réinitialise le style si la section spéciale n'existe pas
    resetStyles();
  }
},0);
// Fonction de conversion HEX en RGB pour utiliser rgba avec les couleurs CSS
function hexToRgb(hex) {
  let bigint = parseInt(hex.replace("#", ""), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

// Fonction pour réinitialiser les styles
function resetStyles() {
  //reset body color
  document.body.style.backgroundColor = backgroundColorDefault;
  document.body.style.color = textColorDefault;
  //et reset cards
  document.querySelectorAll("#peda-projects .peda-card").forEach((card) => {
    card.style.backgroundColor = cardColorDefault;
    card.style.borderColor = borderColorDefault;
  });
  document.querySelectorAll(".tech-modal .modal-content").forEach((modal) => {
    modal.style.backgroundColor = ModalColorDefaut;
    modal.style.borderColor = textColorDefault;
  });
  cancelAnimationFrame(animationFrame);
  animationFrame = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface les particules
}
// Initialiser quelques particules au démarrage
addParticles();

// Gère le scroll pour appliquer les effets de changement de couleur et d'activation des particules

})


