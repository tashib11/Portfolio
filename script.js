const navMenu = document.getElementById('sidemenu');
const openMenuButton = document.querySelector('.nav-toggle');
const closeMenuButton = document.querySelector('.nav-close');
const scrollTopButton = document.querySelector('.scroll-up-button');
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');
const projectShots = document.querySelectorAll('.project-shot');

const setMenuState = (isOpen) => {
  navMenu?.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  openMenuButton?.setAttribute('aria-expanded', String(isOpen));
};

openMenuButton?.addEventListener('click', () => setMenuState(true));
closeMenuButton?.addEventListener('click', () => setMenuState(false));

navMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

projectShots.forEach((shot) => {
  const image = shot.querySelector('img');
  const markAsMissing = () => shot.classList.add('is-missing');

  if (!image) {
    markAsMissing();
    return;
  }

  image.addEventListener('error', markAsMissing);

  if (image.complete && image.naturalWidth === 0) {
    markAsMissing();
  }
});

if (window.Typed) {
  new Typed('.text', {
    strings: ['research on Machine Learning', 'secure applications'],
    typeSpeed: 58,
    backSpeed: 36,
    backDelay: 1100,
    loop: true,
  });
}

window.addEventListener('scroll', () => {
  scrollTopButton?.classList.toggle('is-visible', window.scrollY > 500);
});

scrollTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  formStatus.textContent = '';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Message failed');
    }

    contactForm.reset();
    formStatus.textContent = 'Message sent. I will get back to you soon.';
  } catch (error) {
    formStatus.textContent =
      'Message could not be sent. Please email me directly at tashibul.is@gmail.com.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});
