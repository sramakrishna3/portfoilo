// ======================== Active Nav Highlight on Scroll ========================
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) link.classList.add("active");
  });
});

// ======================== Intersection Observer for Animations ========================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el);
});

// ======================== Contact Form Handler ========================
const contactForm = document.getElementById("contactForm");
const responseMsg = document.getElementById("response");

// Replace with your Google Apps Script Web App URL after deployment
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable submit button and show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
        timestamp: new Date().toISOString()
      };

      try {
        // Check if Google Script URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
          // Simulation for demo purposes if URL not valid
          console.warn('Google Script URL not verified, simulating success for UI demo.');
          await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
        } else {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
        }

        if (responseMsg) {
          responseMsg.textContent = "✅ Message sent successfully!";
          responseMsg.className = "mt-3 text-center fw-semibold text-success";
          responseMsg.style.display = "block";
        }

        contactForm.reset();

        setTimeout(() => {
          if (responseMsg) responseMsg.style.display = "none";
        }, 5000);

      } catch (error) {
        console.error('Error:', error);
        if (responseMsg) {
          responseMsg.textContent = "❌ Error sending message.";
          responseMsg.className = "mt-3 text-center fw-semibold text-danger";
          responseMsg.style.display = "block";

          setTimeout(() => { responseMsg.style.display = "none"; }, 5000);
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    }
  });
}

// ======================== Project Filtering ========================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectItems.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
        // Re-trigger animation
        item.classList.remove('visible');
        setTimeout(() => item.classList.add('visible'), 50);
      } else {
        item.style.display = "none";
        item.classList.remove('visible');
      }
    });
  });
});

// ======================== Certificates Modal ========================
const certCards = document.querySelectorAll(".cert-card");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalIssuer = document.getElementById("modalIssuer");
const modalDate = document.getElementById("modalDate");
const modalDescription = document.getElementById("modalDescription");
const currentCertIndex = document.getElementById("currentCertIndex");
const totalCerts = document.getElementById("totalCerts");

const modalElement = document.getElementById("certificateModal");
if (modalElement && certCards.length > 0) {
  const modal = new bootstrap.Modal(modalElement);
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  // Update total count
  if (totalCerts) totalCerts.textContent = certCards.length;

  function updateModal() {
    const card = certCards[currentIndex];
    const img = card.querySelector(".cert-img");

    // Update image
    if (modalImage && img) modalImage.src = img.src;

    // Update details from data attributes
    if (modalTitle) modalTitle.textContent = card.dataset.title || "Certificate";
    if (modalIssuer) modalIssuer.textContent = card.dataset.issuer || "N/A";
    if (modalDate) modalDate.textContent = card.dataset.date || "N/A";
    if (modalDescription) modalDescription.textContent = card.dataset.description || "";

    // Update counter
    if (currentCertIndex) currentCertIndex.textContent = currentIndex + 1;
  }

  // Click on card to open modal
  certCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      currentIndex = index;
      updateModal();
      modal.show();
    });
  });

  // Navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % certCards.length;
      updateModal();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + certCards.length) % certCards.length;
      updateModal();
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", e => {
    if (modalElement.classList.contains("show")) {
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % certCards.length;
        updateModal();
      } else if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + certCards.length) % certCards.length;
        updateModal();
      }
    }
  });
}

// ======================== Dark/Light Theme Toggle ========================
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  themeIcon.style.transform = "rotate(360deg)";
  setTimeout(() => {
    themeIcon.style.transform = "rotate(0deg)";
  }, 300);

  if (isDark) {
    themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
    localStorage.setItem("theme", "light");
  }
});
