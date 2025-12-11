// Portfolio Enhancements
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Update Copyright Year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // 2. Add tech badges to projects
  addTechBadges();
  
  // 3. Add project card interactions
  enhanceProjectCards();
  
  // 4. Smooth scroll for navigation
  smoothScroll();
  
  // 5. Add animation on scroll
  initScrollAnimations();
  
  // 6. Add loading animation
  initLoadingAnimation();
});

function addTechBadges() {
  const projects = [
    {
      title: 'RealtimeChat',
      tech: ['React', 'Firebase', 'CSS3', 'Authentication']
    },
    {
      title: 'SmartInventory',
      tech: ['React', 'JavaScript', 'CRUD', 'LocalStorage']
    },
    {
      title: 'TaskFlow',
      tech: ['JavaScript', 'HTML/CSS', 'LocalStorage', 'UI/UX']
    },
    {
      title: 'QuickWeather',
      tech: ['API', 'JavaScript', 'Async/Await', 'UI Design']
    }
  ];
  
  const projectCards = document.querySelectorAll('.card h3');
  
  projectCards.forEach((cardTitle, index) => {
    const project = projects[index];
    if (project) {
      const card = cardTitle.closest('.card');
      const description = card.querySelector('p');
      
      const badgeContainer = document.createElement('div');
      badgeContainer.className = 'tech-badges';
      
      project.tech.forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = tech;
        badgeContainer.appendChild(badge);
      });
      
      description.parentNode.insertBefore(badgeContainer, description.nextSibling);
    }
  });
}

function enhanceProjectCards() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    // Add click effect
    card.addEventListener('click', function(e) {
      if (!e.target.closest('a')) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      }
    });
    
    // Add hover glow effect
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
}

function smoothScroll() {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

function initLoadingAnimation() {
  // Simple loading animation for images
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });
    
    // Set initial state
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // If image is already loaded
    if (img.complete) {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }
  });
}

// Add console greeting
console.log(
  '%c👋 Welcome to Musa\'s Portfolio!',
  'color: #2563eb; font-size: 16px; font-weight: bold;'
);
console.log(
  '%cInterested in working together? Contact me at musamansaray90946@gmail.com',
  'color: #64748b; font-size: 14px;'
);