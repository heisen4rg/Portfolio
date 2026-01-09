// Smooth letter animation system
document.addEventListener('DOMContentLoaded', () => {
  const heroName = document.querySelector('.hero-name');
  const nameInitial = document.querySelector('.name-initial');

  if (!heroName || !nameInitial) return;

  // Function to calculate and set animation position
  const calculatePosition = () => {
    const animTarget = document.querySelector('.anim-target');

    if (!animTarget) return;

    // Get the rects
    const targetRect = animTarget.getBoundingClientRect();
    const initialRect = nameInitial.getBoundingClientRect();

    // Calculate centers
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const initialCenterX = initialRect.left + initialRect.width / 2;
    const initialCenterY = initialRect.top + initialRect.height / 2;

    // Calculate difference (Target - Initial)
    // This is where we want to START (at target), relative to where we END (at initial)
    const deltaX = targetCenterX - initialCenterX;
    const deltaY = targetCenterY - initialCenterY;

    // Set CSS custom properties
    heroName.style.setProperty('--delta-x', `${deltaX}px`);
    heroName.style.setProperty('--delta-y', `${deltaY}px`);
  };

  // Calculate on load
  requestAnimationFrame(() => {
    // Force a layout check to ensure fonts are loaded/rendering
    document.fonts.ready.then(() => {
      requestAnimationFrame(calculatePosition);
    });
  });

  // Recalculate on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(calculatePosition, 100);
  });
});

