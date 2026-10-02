document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 2000; // Animation duration in ms
  let hasAnimated = false;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      
      if (prefersReducedMotion) {
        // If reduced motion is preferred, just set the final number immediately
        counter.innerText = target.toLocaleString('en-US');
        return;
      }

      // Initial state
      counter.innerText = '0';
      let startTime = null;

      const step = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / speed, 1);
        
        // Ease out cubic for a smoother slow-down at the end
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * target);

        counter.innerText = currentCount.toLocaleString('en-US');

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.innerText = target.toLocaleString('en-US');
        }
      };

      requestAnimationFrame(step);
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.getElementById('estadisticas');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
