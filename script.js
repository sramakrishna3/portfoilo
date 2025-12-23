// ======================== Active Nav Highlight on Scroll ========================
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  document.querySelectorAll("section").forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) link.classList.add("active");
  });
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
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    }
    
    // Get form data
    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      // Check if Google Script URL is configured
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        throw new Error('Please configure your Google Apps Script URL in script.js');
      }

      // Send data to Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Since no-cors mode doesn't return response, we'll assume success
      // Show success message
      if (responseMsg) {
        responseMsg.textContent = "✅ Your message has been sent successfully! I'll reply soon.";
        responseMsg.className = "mt-3 fw-semibold success";
        responseMsg.style.display = "block";
      }
      
      // Reset form
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        if (responseMsg) {
          responseMsg.style.display = "none";
          responseMsg.className = "mt-3 fw-semibold";
        }
      }, 5000);

    } catch (error) {
      console.error('Error:', error);
      if (responseMsg) {
        responseMsg.textContent = "❌ There was an error sending your message. Please try again or contact me directly via email.";
        responseMsg.className = "mt-3 fw-semibold error";
        responseMsg.style.display = "block";
        
        // Hide error message after 7 seconds
        setTimeout(() => {
          responseMsg.style.display = "none";
          responseMsg.className = "mt-3 fw-semibold";
        }, 7000);
      }
    } finally {
      // Re-enable submit button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
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
        setTimeout(() => item.classList.add("fade-in"), 50);
      } else {
        item.classList.remove("fade-in");
        setTimeout(() => (item.style.display = "none"), 200);
      }
    });
  });
});

// ======================== Certificates Modal ========================
const certImages = document.querySelectorAll(".cert-img");
const modalImage = document.getElementById("modalImage");
const modal = new bootstrap.Modal(document.getElementById("certificateModal"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function showImage() {
  modalImage.src = certImages[currentIndex].src;
}

certImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    modal.show();
  });
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % certImages.length;
  showImage();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + certImages.length) % certImages.length;
  showImage();
});

// Keyboard navigation for modal
document.addEventListener("keydown", e => {
  if (document.getElementById("certificateModal").classList.contains("show")) {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % certImages.length;
      showImage();
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + certImages.length) % certImages.length;
      showImage();
    } else if (e.key === "Escape") {
      modal.hide();
    }
  }
});

// ======================== Dark/Light Theme Toggle ========================
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const currentTheme = localStorage.getItem("theme");

// Apply saved theme on page load
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
} else {
  document.body.classList.remove("dark-mode");
  themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
}

// Smooth transition for theme change
document.body.style.transition = "background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

themeToggle.addEventListener("click", () => {
  // Add transition class for smooth animation
  document.body.style.transition = "background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
  
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  // Animate icon rotation
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

// Add transition to icon
if (themeIcon) {
  themeIcon.style.transition = "transform 0.3s ease";
}
