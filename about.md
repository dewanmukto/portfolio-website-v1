---
layout: default
title: "About"
permalink: /about/
---

<div class="about-page">
  <div class="container">
    <div class="about-content">
      <h1>About Dewan Mukto</h1>
      
      <div class="about-intro">
        <p>Welcome to my digital space. I'm Dewan Mukto, a multi-disciplinary creative professional who believes in the power of both words and code to shape our world.</p>
      </div>
      
      <div class="about-sections">
        <section class="about-section">
          <h2>Who I Am</h2>
          <p>I'm a hobbyist author & poet, aspiring technocrat, full-time technologist, and part-time scientist. My work spans across literature, technology, and creative design, always exploring new ways to connect with people through creative expression.</p>
        </section>
        
        <section class="about-section">
          <h2>What I Do</h2>
          <ul>
            <li><strong>Writing:</strong> Author of multiple published books spanning fiction and non-fiction</li>
            <li><strong>Development:</strong> Full-stack developer with expertise in modern web technologies</li>
            <li><strong>Design:</strong> UI/UX designer creating intuitive and beautiful digital experiences</li>
            <li><strong>Education:</strong> Sharing knowledge through tutorials, articles, and speaking engagements</li>
          </ul>
        </section>
        
        <section class="about-section">
          <h2>My Journey</h2>
          <p>Based between Bangladesh and Canada, I've had the privilege of working across different cultures and industries. From teaching English in rural Bangladesh to developing software solutions for international clients, each experience has shaped my perspective and approach to creative problem-solving.</p>
        </section>
        
        <section class="about-section">
          <h2>Philosophy</h2>
          <p>I believe that the best creative work happens at the intersection of art and science, emotion and logic, tradition and innovation. Whether I'm crafting a psychological thriller or building a web application, I'm always looking for ways to create meaningful connections and lasting impact.</p>
        </section>
      </div>
      
      <div class="about-cta">
        <h2>Let's Connect</h2>
        <p>I'm always interested in collaborating on interesting projects, discussing ideas, or simply connecting with fellow creatives and technologists.</p>
        <div class="about-links">
          <a href="/#contact" class="about-link">
            <span class="iconify" data-icon="solar:letter-bold-duotone"></span>
            <span>Get in Touch</span>
          </a>
          <a href="/#books" class="about-link secondary">
            <span class="iconify" data-icon="solar:book-bold-duotone"></span>
            <span>Read My Books</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.about-page {
  min-height: calc(100vh - 200px);
  padding: var(--spacing-2xl) 0;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about-content h1 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: var(--spacing-2xl);
  color: var(--color-primary);
}

.about-intro {
  text-align: center;
  font-size: 1.25rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
}

.about-sections {
  margin-bottom: var(--spacing-2xl);
}

.about-section {
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl);
  background: var(--color-surface);
  border-radius: var(--border-radius);
  border-left: 4px solid var(--color-primary);
}

.about-section h2 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.about-section ul {
  list-style: none;
  padding: 0;
}

.about-section li {
  margin-bottom: var(--spacing-md);
  padding-left: var(--spacing-lg);
  position: relative;
}

.about-section li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: bold;
}

.about-cta {
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
}

.about-cta h2 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.about-links {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  margin-top: var(--spacing-xl);
  flex-wrap: wrap;
}

.about-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-primary);
  color: var(--color-bg);
  text-decoration: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
}

.about-link:hover {
  background: var(--color-secondary);
  transform: translateY(-2px);
}

.about-link.secondary {
  background: var(--color-border);
  color: var(--color-text);
}

.about-link.secondary:hover {
  background: var(--color-accent);
}

@media (max-width: 768px) {
  .about-content h1 {
    font-size: 2.5rem;
  }
  
  .about-intro,
  .about-section,
  .about-cta {
    padding: var(--spacing-lg);
  }
  
  .about-links {
    flex-direction: column;
    align-items: center;
  }
  
  .about-link {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style>