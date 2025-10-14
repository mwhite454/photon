// Custom JS
console.debug('Photon docs loaded');

// Collapsible Navigation Accordion
document.addEventListener('DOMContentLoaded', function() {
  // Find all navigation section headers
  const navSections = document.querySelectorAll('.md-nav__item--section > .md-nav__link');
  
  navSections.forEach(function(sectionLink) {
    // Make section headers clickable to toggle collapse
    sectionLink.addEventListener('click', function(e) {
      const navItem = this.parentElement;
      
      // Don't prevent default if this is a real link (has href)
      if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
        e.preventDefault();
      }
      
      // Toggle active class
      navItem.classList.toggle('md-nav__item--active');
      
      // Close other sections (accordion behavior)
      const allSections = document.querySelectorAll('.md-nav__item--section');
      allSections.forEach(function(section) {
        if (section !== navItem && !section.querySelector('.md-nav__link--active')) {
          section.classList.remove('md-nav__item--active');
        }
      });
    });
  });
  
  // Keep the section containing the current page expanded
  const currentPage = document.querySelector('.md-nav__link--active');
  if (currentPage) {
    let parent = currentPage.closest('.md-nav__item--section');
    while (parent) {
      parent.classList.add('md-nav__item--active');
      parent = parent.parentElement.closest('.md-nav__item--section');
    }
  }
});
