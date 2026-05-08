// BIZ AUTOMATE PRO - Main JS

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// Fade-up animation on scroll
const fadeEls = document.querySelectorAll('.service-card, .why-card, .fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {

  contactForm.addEventListener('submit', async function(e) {

    e.preventDefault();

    const btn = this.querySelector('button[type="submit"]');

    btn.innerText = 'Sending...';
    btn.disabled = true;

    const formData = {
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
      business: this.business.value,
      message: this.message.value
    };

    try {

      await fetch(
        'https://script.google.com/macros/s/AKfycbwF0qzw8oPSuOA4K2ENjMmINuI0Q2qjalwF22K0_t-Fo4glHreFXx32vbSXuiAxaN4p/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      document.getElementById('formSuccess').style.display = 'block';

      contactForm.reset();

      btn.innerText = 'Message Sent ✅';

    } catch (err) {

      console.error(err);

      btn.innerText = 'Send Message 🚀';

      btn.disabled = false;

      alert('Something went wrong');

    }

  });

}
