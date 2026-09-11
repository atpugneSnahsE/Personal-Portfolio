import { animate, stagger } from 'animejs';

export const animateOnScroll = (selector: string, animation: any) => {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target, {
          ...animation,
          duration: 800,
          easing: 'easeOutQuad',
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
};

export const animateStatNumbers = (selector: string) => {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.textContent?.match(/^\d+/)) {
        const finalValue = parseInt(entry.target.textContent || '0');
        animate(entry.target, {
          innerHTML: [0, finalValue],
          round: 1,
          duration: 2000,
          easing: 'easeOutExpo',
          update(anim: any) {
            (entry.target as HTMLElement).textContent = Math.floor(anim.progress * finalValue) + '+';
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
};

export const staggerAnimation = (selector: string, delay: number = 50) => {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(elements, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutQuad',
          delay: stagger(delay),
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(elements[0]);
};

export const hoverScaleAnimation = (selector: string) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      animate(el, {
        scale: 1.05,
        duration: 300,
        easing: 'easeOutQuad',
      });
    });

    el.addEventListener('mouseleave', () => {
      animate(el, {
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad',
      });
    });
  });
};

export const fadeInUp = (selector: string) => {
  animateOnScroll(selector, {
    opacity: [0, 1],
    translateY: [40, 0],
  });
};

export const slideInLeft = (selector: string) => {
  animateOnScroll(selector, {
    opacity: [0, 1],
    translateX: [-60, 0],
  });
};

export const slideInRight = (selector: string) => {
  animateOnScroll(selector, {
    opacity: [0, 1],
    translateX: [60, 0],
  });
};
