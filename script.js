// Theme toggle: load preference or system default
const htmlEl = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  htmlEl.setAttribute('data-theme', 'dark');
}

document.querySelector('[data-theme-toggle]').addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

function createListItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  return li;
}

function createCard(title, description, meta = '', links = []) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <p><em>${meta}</em></p>
    <div class="card-links">
      ${links.map(link => `<a href="${link.url}" target="_blank">${link.label}</a>`).join('')}
    </div>
  `;
  return card;
}

function createImageCard(title, imgUrl, description = '') {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${imgUrl}" alt="${title}" loading="lazy">
    <h3>${title}</h3>
    <p>${description}</p>
  `;
  return card;
}

// Load data functions
function loadAchievements() {
  fetch('data/achievements.json')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('achievements-list');
      data.forEach(item => {
        const text = `${item.date}: ${item.title}` +
          (item.event ? ` – ${item.event}` : '') +
          (item.location ? ` (${item.location})` : '');
        list.appendChild(createListItem(text));
      });
    });
}

function loadEducation() {
  fetch('data/education.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('education-list');
      data.forEach(edu => {
        const card = createCard(edu.institution, edu.degree, `${edu.start} - ${edu.end}`);
        container.appendChild(card);
      });
    });
}

function loadProjects() {
  fetch('data/projects.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('projects-list');
      data.forEach(proj => {
        const links = [];
        if (proj.url) links.push({ label: 'Live', url: proj.url });
        if (proj.repo) links.push({ label: 'Repo', url: proj.repo });
        const card = createCard(proj.title, proj.description, `Category: ${proj.category}`, links);
        container.appendChild(card);
      });
    });
}

function loadSkills() {
  fetch('data/skills.json')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('skills-list');
      data.forEach(skill => {
        list.appendChild(createListItem(skill));
      });
    });
}

function loadBooks() {
  fetch('data/books.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('books-list');
      data.forEach(book => {
        const card = createImageCard(book.title, book.cover, book.description);
        container.appendChild(card);
      });
    });
}

function loadDesigns() {
  fetch('data/designs.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('designs-list');
      data.forEach(design => {
        const card = createImageCard(design.title, design.image, design.description);
        container.appendChild(card);
      });
    });
}

function loadVideos() {
  fetch('data/videos.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('videos-list');
      data.forEach(video => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <iframe src="${video.embed}" title="${video.title}" frameborder="0" allowfullscreen loading="lazy"></iframe>
          <h3>${video.title}</h3>
        `;
        container.appendChild(card);
      });
    });
}

function loadSocials() {
  fetch('data/socials.json')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('social-list');
      data.forEach(social => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${social.url}" target="_blank" aria-label="${social.platform}">
          <span class="iconify-inline" data-icon="${social.icon}"></span>
          ${social.platform}
        </a>`;
        list.appendChild(li);
      });
    });
}

// Load all data
loadAchievements();
loadEducation();
loadProjects();
loadSkills();
loadBooks();
loadDesigns();
loadVideos();
loadSocials();

// Framer Motion for Web animation (Motion One)
import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

// Animate navigation on load
const navBar = document.querySelector('.nav-bar');
if (navBar) {
  navBar.style.transform = 'translateY(-50px)';
  navBar.style.opacity = 0;
  animate(navBar, { y: 0, opacity: 1 }, { duration: 0.6 });
}

// Animate all cards on scroll into view
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animate(entry.target, { opacity: [0, 1], y: [-20, 0] }, { duration: 0.4 });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Observe all .card elements after dynamic load
const cardObserverInterval = setInterval(() => {
  const cards = document.querySelectorAll('.card:not([data-animated])');
  if (cards.length) {
    cards.forEach(card => {
      card.setAttribute('data-animated', 'true');
      observer.observe(card);
    });
  }
}, 500);
