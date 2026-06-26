// Optional EmailJS bootstrap. The live contact form is handled by Formspree in script.js.
document.addEventListener('DOMContentLoaded', () => {
  if (!window.emailjs) {
    return;
  }

  window.emailjs.init('5ySi9pV5-xxYb2F0J');
});
