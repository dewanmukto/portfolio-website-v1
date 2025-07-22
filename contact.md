---
layout: default
title: "Contact"
permalink: /contact/
---

<div class="contact-page">
  <div class="container">
    <div class="contact-content">
      <h1>Get in Touch</h1>
      
      <div class="contact-intro">
        <p>Whether you're interested in my books, need creative services, or want to collaborate on a project, I'd love to hear from you. Let's start a conversation.</p>
      </div>
      
      <div class="contact-methods">
        <div class="contact-method">
          <div class="contact-icon">
            <span class="iconify" data-icon="solar:letter-bold-duotone"></span>
          </div>
          <h3>Email</h3>
          <p>Send me a direct message</p>
          <a href="mailto:hello@dewanmukto.com">hello@dewanmukto.com</a>
        </div>
        
        <div class="contact-method">
          <div class="contact-icon">
            <span class="iconify" data-icon="solar:map-point-bold-duotone"></span>
          </div>
          <h3>Location</h3>
          <p>Based between two countries</p>
          <span>Dhaka, BD • St. John's, CA</span>
        </div>
        
        <div class="contact-method">
          <div class="contact-icon">
            <span class="iconify" data-icon="solar:calendar-bold-duotone"></span>
          </div>
          <h3>Availability</h3>
          <p>Currently available for new projects</p>
          <span>Mon-Fri, 9 AM - 6 PM</span>
        </div>
      </div>
      
      <div class="contact-social">
        <h2>Connect on Social Media</h2>
        <div class="social-links">
          <a href="https://github.com/dewanmukto" target="_blank" rel="noopener noreferrer" class="social-link">
            <span class="iconify" data-icon="solar:github-bold-duotone"></span>
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/dewanmukto" target="_blank" rel="noopener noreferrer" class="social-link">
            <span class="iconify" data-icon="solar:linkedin-bold-duotone"></span>
            <span>LinkedIn</span>
          </a>
          <a href="https://dribbble.com/dewanmukto" target="_blank" rel="noopener noreferrer" class="social-link">
            <span class="iconify" data-icon="solar:dribbble-bold-duotone"></span>
            <span>Dribbble</span>
          </a>
          <a href="https://medium.com/@dewanmukto" target="_blank" rel="noopener noreferrer" class="social-link">
            <span class="iconify" data-icon="solar:document-text-bold-duotone"></span>
            <span>Medium</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.contact-page {
  min-height: calc(100vh - 200px);
  padding: var(--spacing-2xl) 0;
}

.contact-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.contact-content h1 {
  font-size: 3rem;
  margin-bottom: var(--spacing-xl);
  color: var(--color-primary);
}

.contact-intro {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.contact-method {
  background: var(--color-surface);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  transition: var(--transition);
}

.contact-method:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px var(--color-shadow-hover);
}

.contact-icon {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.contact-method h3 {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.contact-method p {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
  font-size: 0.875rem;
}

.contact-method a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.contact-method a:hover {
  text-decoration: underline;
}

.contact-social {
  background: var(--color-surface);
  padding: var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
}

.contact-social h2 {
  margin-bottom: var(--spacing-xl);
  color: var(--color-primary);
}

.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: var(--color-border);
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: var(--transition);
  font-weight: 500;
}

.social-link:hover {
  background: var(--color-primary);
  color: var(--color-bg);
  transform: translateY(-2px);
}

.social-link .iconify {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .contact-content h1 {
    font-size: 2.5rem;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    grid-template-columns: 1fr;
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> origin/main
