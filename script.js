// Update footer year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for navigation clicks
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
