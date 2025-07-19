// Theme management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('.iconify');
  icon.setAttribute('data-icon', theme === 'light' ? 'solar:moon-bold-duotone' : 'solar:sun-bold-duotone');
}

// Tab navigation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');
    
    // Remove active class from all tabs and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    button.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
    
    // Animate tab transition
    const activeContent = document.getElementById(targetTab);
    activeContent.style.opacity = '0';
    activeContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      activeContent.style.opacity = '1';
      activeContent.style.transform = 'translateY(0)';
    }, 50);
  });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
let allData = {};

// Load all data
async function loadAllData() {
  try {
    const [achievements, education, employment, skills, projects, books, designs, videos, socials] = await Promise.all([
      fetch('data/achievements.json').then(r => r.json()),
      fetch('data/education.json').then(r => r.json()),
      fetch('data/employments.json').then(r => r.json()),
      fetch('data/skills.json').then(r => r.json()),
      fetch('data/projects.json').then(r => r.json()),
      fetch('data/books.json').then(r => r.json()),
      fetch('data/designs.json').then(r => r.json()),
      fetch('data/videos.json').then(r => r.json()),
      fetch('data/socials.json').then(r => r.json())
    ]);
    
    allData = {
      achievements,
      education,
      employment,
      skills,
      projects,
      books,
      designs,
      videos,
      socials
    };
    
    // Load content for each tab
    loadAchievements();
    loadEducation();
    loadEmployment();
    loadSkills();
    loadProjects();
    loadBooks();
    loadDesigns();
    loadVideos();
    loadSocials();
    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Search implementation
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  
  if (query.length < 2) {
    searchResults.classList.remove('show');
    return;
  }
  
  const results = searchAllData(query);
  displaySearchResults(results);
});

function searchAllData(query) {
  const results = {};
  
  // Search achievements
  results.achievements = allData.achievements?.filter(item => 
    item.title?.toLowerCase().includes(query) ||
    item.event?.toLowerCase().includes(query) ||
    item.location?.toLowerCase().includes(query)
  ) || [];
  
  // Search education
  results.education = allData.education?.filter(item =>
    item.institution?.toLowerCase().includes(query) ||
    item.degree?.toLowerCase().includes(query) ||
    item.board?.toLowerCase().includes(query) ||
    item.location?.city?.toLowerCase().includes(query) ||
    item.location?.country?.toLowerCase().includes(query)
  ) || [];
  
  // Search employment
  results.employment = allData.employment?.filter(item =>
    item.company?.toLowerCase().includes(query) ||
    (Array.isArray(item.role) ? item.role.some(r => r.toLowerCase().includes(query)) : item.role?.toLowerCase().includes(query)) ||
    item.industry?.toLowerCase().includes(query) ||
    item.department?.toLowerCase().includes(query) ||
    item.location?.city?.toLowerCase().includes(query) ||
    item.location?.country?.toLowerCase().includes(query)
  ) || [];
  
  // Search skills
  results.skills = allData.skills?.filter(skill =>
    skill.toLowerCase().includes(query)
  ) || [];
  
  // Search projects
  results.projects = allData.projects?.filter(project =>
    project.title?.toLowerCase().includes(query) ||
    project.description?.toLowerCase().includes(query) ||
    project.technologies?.some(tech => tech.toLowerCase().includes(query)) ||
    project.category?.toLowerCase().includes(query)
  ) || [];
  
  // Search books
  results.books = allData.books?.filter(book =>
    book.title?.toLowerCase().includes(query) ||
    book.blurb?.toLowerCase().includes(query) ||
    book.metadata?.category?.toLowerCase().includes(query) ||
    book.metadata?.genres?.some(genre => genre.toLowerCase().includes(query))
  ) || [];
  
  // Search designs
  results.designs = allData.designs?.filter(design =>
    design.title?.toLowerCase().includes(query) ||
    design.category?.toLowerCase().includes(query)
  ) || [];
  
  return results;
}

function displaySearchResults(results) {
  searchResults.innerHTML = '';
  
  let hasResults = false;
  
  Object.entries(results).forEach(([category, items]) => {
    if (items.length > 0) {
      hasResults = true;
      
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'search-category';
      categoryDiv.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      searchResults.appendChild(categoryDiv);
      
      items.slice(0, 3).forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'search-item';
        itemDiv.addEventListener('click', () => {
          // Switch to the relevant tab
          const tabBtn = document.querySelector(`[data-tab="${category}"]`);
          if (tabBtn) {
            tabBtn.click();
          }
          searchResults.classList.remove('show');
          searchInput.value = '';
        });
        
        const title = getItemTitle(item, category);
        const meta = getItemMeta(item, category);
        
        itemDiv.innerHTML = `
          <div class="search-item-title">${title}</div>
          <div class="search-item-meta">${meta}</div>
        `;
        
        searchResults.appendChild(itemDiv);
      });
    }
  });
  
  if (hasResults) {
    searchResults.classList.add('show');
  } else {
    searchResults.classList.remove('show');
  }
}

function getItemTitle(item, category) {
  switch (category) {
    case 'achievements':
      return item.title;
    case 'education':
      return `${item.degree} - ${item.institution}`;
    case 'employment':
      return `${Array.isArray(item.role) ? item.role[0] : item.role} at ${item.company}`;
    case 'skills':
      return item;
    case 'projects':
      return item.title;
    case 'books':
      return item.title;
    case 'designs':
      return item.title;
    default:
      return 'Unknown';
  }
}

function getItemMeta(item, category) {
  switch (category) {
    case 'achievements':
      return `${item.date} - ${item.event || 'Achievement'}`;
    case 'education':
      return `${item.start_date} - ${item.end_date}`;
    case 'employment':
      return `${item.start_date} - ${item.end_date}`;
    case 'skills':
      return 'Skill';
    case 'books':
      return `${item.metadata.category} - ${item.metadata.yearPublished}`;
    case 'designs':
      return item.category;
    default:
      return '';
  }
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    searchResults.classList.remove('show');
  }
});

// Content loading functions
function loadAchievements() {
  const container = document.getElementById('achievements-list');
  container.innerHTML = '';
  
  allData.achievements?.forEach((achievement, index) => {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="achievement-title">${achievement.title}</div>
      <div class="achievement-event">${achievement.event || 'Achievement'}</div>
      <div class="achievement-meta">
        <span>${achievement.date}</span>
        <span>${achievement.location}</span>
      </div>
    `;
    
    container.appendChild(card);
  });
}

function loadEducation() {
  const container = document.getElementById('education-list');
  container.innerHTML = '';
  
  allData.education?.forEach((edu, index) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.style.animationDelay = `${index * 0.1}s`;
    
    const gradesHtml = edu.grades ? Object.entries(edu.grades).map(([subject, grade]) => `
      <div class="grade-item">
        <div class="grade-subject">${subject}</div>
        <div class="grade-value">${grade}</div>
      </div>
    `).join('') : '';
    
    item.innerHTML = `
      <div class="timeline-title">${edu.institution || 'Independent Study'}</div>
      <div class="timeline-subtitle">${edu.degree}</div>
      <div class="timeline-meta">
        <span><span class="iconify" data-icon="solar:calendar-bold-duotone"></span> ${edu.start_date} - ${edu.end_date}</span>
        <span><span class="iconify" data-icon="solar:map-point-bold-duotone"></span> ${edu.location.city}, ${edu.location.country}</span>
        ${edu.board ? `<span><span class="iconify" data-icon="solar:document-bold-duotone"></span> ${edu.board}</span>` : ''}
      </div>
      ${gradesHtml ? `<div class="timeline-grades">${gradesHtml}</div>` : ''}
    `;
    
    container.appendChild(item);
  });
}

function loadEmployment() {
  const container = document.getElementById('employment-list');
  container.innerHTML = '';
  
  allData.employment?.forEach((job, index) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.style.animationDelay = `${index * 0.1}s`;
    
    const roles = Array.isArray(job.role) ? job.role.join(', ') : job.role;
    
    item.innerHTML = `
      <div class="timeline-title">${job.company}</div>
      <div class="timeline-subtitle">${roles}</div>
      <div class="timeline-meta">
        <span><span class="iconify" data-icon="solar:calendar-bold-duotone"></span> ${job.start_date} - ${job.end_date}</span>
        <span><span class="iconify" data-icon="solar:map-point-bold-duotone"></span> ${job.location.city}, ${job.location.country}</span>
        <span><span class="iconify" data-icon="solar:buildings-bold-duotone"></span> ${job.industry}</span>
        <span><span class="iconify" data-icon="solar:case-bold-duotone"></span> ${job.department}</span>
      </div>
    `;
    
    container.appendChild(item);
  });
}

function loadSkills() {
  const container = document.getElementById('skills-list');
  container.innerHTML = '';
  
  allData.skills?.forEach((skill, index) => {
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    tag.style.animationDelay = `${index * 0.05}s`;
    
    container.appendChild(tag);
  });
}

function loadProjects() {
  const container = document.getElementById('projects-list');
  container.innerHTML = '';
  
  allData.projects?.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const techTags = project.technologies?.map(tech => 
      `<span class="tech-tag">${tech}</span>`
    ).join('') || '';
    
    const links = [];
    if (project.repo) {
      links.push(`<a href="${project.repo}" target="_blank" rel="noopener noreferrer" class="project-link">
        <span class="iconify" data-icon="solar:code-bold-duotone"></span>
        <span>GitHub</span>
      </a>`);
    }
    if (project.url) {
      links.push(`<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link secondary">
        <span class="iconify" data-icon="solar:eye-bold-duotone"></span>
        <span>Live Demo</span>
      </a>`);
    }
    
    card.innerHTML = `
  <div class="project-header">
    <div class="project-title">
      ${project.icon 
        ? `<img src="${project.icon}" alt="${project.title} icon" class="project-icon" />` 
        : `<span class="iconify" data-icon="solar:widget-bold-duotone"></span>`}
      ${project.title}
    </div>
    <div class="project-description">${project.description}</div>
    <div class="project-tech">${techTags}</div>
  </div>
  ${links.length > 0 ? `<div class="project-links">${links.join('')}</div>` : ''}
  <div class="project-meta">
    <span>${project.category}</span>
    <span class="project-status">${project.type}</span>
  </div>
`;
    
    container.appendChild(card);
  });
}

function loadBooks() {
  const container = document.getElementById('books-list');
  container.innerHTML = '';
  
  allData.books?.forEach((book, index) => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="book-cover" loading="lazy">
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-blurb">${book.blurb}</div>
        <div class="book-meta">
          <span class="book-category">${book.metadata.category}</span>
          <span>${book.metadata.yearPublished}</span>
        </div>
      </div>
    `;
    
    // Add click handler to show book details
    card.addEventListener('click', () => showBookDetails(book));
    
    container.appendChild(card);
  });
}

function loadDesigns() {
  const container = document.getElementById('designs-list');
  container.innerHTML = '';
  
  allData.designs?.forEach((design, index) => {
    const card = document.createElement('div');
    card.className = 'design-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <img src="${design.thumbnail}" alt="${design.title}" class="design-thumbnail" loading="lazy">
      <div class="design-info">
        <div class="design-title">${design.title}</div>
        <div class="design-category">${design.category}</div>
      </div>
    `;
    
    // Add click handler to open design link
    card.addEventListener('click', () => {
      window.open(design.link, '_blank');
    });
    
    container.appendChild(card);
  });
}

function loadVideos() {
  const container = document.getElementById('videos-list');
  container.innerHTML = '';
  
  allData.videos?.forEach((video, index) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <img src="${video.thumbnail}" alt="Video thumbnail" class="video-thumbnail" loading="lazy">
      <div class="video-overlay">
        <div class="play-button">
          <span class="iconify" data-icon="solar:play-bold-duotone"></span>
        </div>
      </div>
    `;
    
    // Add click handler to open video modal
    card.addEventListener('click', () => showVideoModal(video.video));
    
    container.appendChild(card);
  });
}

function loadSocials() {
  const container = document.getElementById('social-list');
  container.innerHTML = '';
  
  const socialIcons = {
    'LinkedIn': 'fab fa-linkedin',
    'Medium': 'fab fa-medium',
    'GitHub': 'fab fa-github',
    'CodePen': 'fab fa-codepen',
    'Behance': 'fab fa-behance',
    'Dribbble': 'fab fa-dribbble',
    'Goodreads': 'fab fa-goodreads'
  };
  
  Object.entries(allData.socials || {}).forEach(([platform, url], index) => {
    const card = document.createElement('a');
    card.className = 'social-card';
    card.href = url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const iconClass = socialIcons[platform] || 'fas fa-link';
    
    card.innerHTML = `
      <div class="social-icon">
        <i class="${iconClass}"></i>
      </div>
      <div class="social-name">${platform}</div>
      <div class="social-handle">@dewanmukto</div>
    `;
    
    container.appendChild(card);
  });
}

// Modal functionality
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const videoContainer = document.getElementById('videoContainer');

function showVideoModal(videoUrl) {
  const iframe = document.createElement('iframe');
  iframe.src = videoUrl;
  iframe.allowFullscreen = true;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  
  videoContainer.innerHTML = '';
  videoContainer.appendChild(iframe);
  
  videoModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function hideVideoModal() {
  videoModal.classList.remove('show');
  videoContainer.innerHTML = '';
  document.body.style.overflow = '';
}

closeModal.addEventListener('click', hideVideoModal);

videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    hideVideoModal();
  }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.classList.contains('show')) {
    hideVideoModal();
  }
});

// Book details modal (simple alert for now, can be enhanced)
function showBookDetails(book) {
  const genres = book.metadata.genres.join(', ');
  const purchaseLinks = book.purchaseLinks.map(link => 
    `${link.vendor} (${link.edition}): ${link.price}`
  ).join('\n');
  
  alert(`${book.title}

${book.blurb}

Category: ${book.metadata.category}
Genres: ${genres}
Year Written: ${book.metadata.yearWritten}
Year Published: ${book.metadata.yearPublished}
Pages: ${book.metadata.pages || 'N/A'}

Purchase Options:
${purchaseLinks}`);
}

// Smooth scrolling for better UX
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Add loading animation
function addLoadingAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    .achievement-card,
    .timeline-item,
    .skill-tag,
    .book-card,
    .design-card,
    .video-card,
    .social-card {
      opacity: 0;
      transform: translateY(20px);
      animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  addLoadingAnimation();
  loadAllData();
  
  // Update brand logo
  const brandIcon = document.querySelector('.brand-icon');
  if (brandIcon) {
    brandIcon.innerHTML = '<img src="data/logo.png" alt="Dewan Mukto Logo" class="brand-logo" />';
  }
  
  // Update favicon based on theme
  //updateFavicon();
});

// Update favicon based on theme
function updateFavicon() {
  const favicon = document.getElementById('favicon');
  const theme = htmlElement.getAttribute('data-theme');
  
  // Create a canvas to invert the logo for light theme
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    
    if (theme === 'light') {
      // Invert colors for light theme
      ctx.filter = 'invert(1)';
    }
    
    ctx.drawImage(img, 0, 0);
    favicon.href = canvas.toDataURL();
  };
  
  img.src = 'data/logo.png';
}

// Update favicon when theme changes
const originalToggleTheme = themeToggle.onclick;
themeToggle.onclick = function() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
  //updateFavicon();
};

// Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

// Observe elements when they're added to the DOM
const observeElements = () => {
  document.querySelectorAll('.achievement-card, .timeline-item, .skill-tag, .project-card, .book-card, .design-card, .video-card, .social-card').forEach(el => {
    observer.observe(el);
  });
};

// Call observeElements after content is loaded
setTimeout(observeElements, 1000);
