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

contactForm?.addEventListener("submit", e => {
  e.preventDefault();
  responseMsg.textContent = "✅ Your message has been sent successfully! I'll reply soon.";
  contactForm.reset();
});

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

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
}

// Add smooth transition effect
document.body.style.transition = "background-color 0.3s, color 0.3s";

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
    localStorage.setItem("theme", "light");
  }
});
