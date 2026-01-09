// Smooth letter animation system
document.addEventListener('DOMContentLoaded', () => {
  const heroName = document.querySelector('.hero-name');
  const nameInitial = document.querySelector('.name-initial');
  
  if (!heroName || !nameInitial) return;
  
  // Function to calculate and set animation position
  const calculatePosition = () => {
    // Get the final position of the D relative to viewport
    const nameInitialRect = nameInitial.getBoundingClientRect();
    
    // Calculate center of viewport
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    
    // Calculate final position of D (center of the letter)
    const finalX = nameInitialRect.left + nameInitialRect.width / 2;
    const finalY = nameInitialRect.top + nameInitialRect.height / 2;
    
    // Calculate the transform needed to move from viewport center to final position
    // Since the pseudo-element is at left: 50%, top: 50% with translate(-50%, -50%),
    // we need to move it by the difference
    const offsetX = finalX - viewportCenterX;
    const offsetY = finalY - viewportCenterY;
    
    // Set CSS custom property for final position
    heroName.style.setProperty('--final-x', `${offsetX}px`);
    heroName.style.setProperty('--final-y', `${offsetY}px`);
  };
  
  // Calculate on load
  requestAnimationFrame(() => {
    requestAnimationFrame(calculatePosition);
  });
  
  // Recalculate on resize for responsiveness
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(calculatePosition, 100);
  });
});

