// DOM Elements
const header = document.getElementById("header")
const hamburger = document.querySelector(".hamburger")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileLinks = document.querySelectorAll(".mobile-link")
const contactForm = document.getElementById("contact-form")
const currentYearSpan = document.getElementById("current-year")

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear()

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})
const container = document.getElementById('text-container');
const xd = document.getElementById('header');
const textArray = ['Hola 👋', 'नमस्ते 👋', 'مرحبا 👋', 'Bonjour 👋', '你好 (Nǐ hǎo) 👋', 'こんにちは 👋', "", ""];
let currentIndex = 0;

// Hide the navbar initially
header.classList.add('hidden');
document.body.style.overflow = 'hidden';

setTimeout(() => {
    const interval = setInterval(() => {
        if (currentIndex >= textArray.length) {
            clearInterval(interval); // Stop text animation
            container.classList.add('move-up'); // Move animation div u

            // Reveal the navbar and content after the animation
            setTimeout(() => {
                document.body.style.overflow = '';
                xd.classList.remove('hidden');
            }, 1000); // Matches the animation duration
            return;
        }
        container.textContent = textArray[currentIndex];
        currentIndex++;
    }, 200);
}, 500); // Initial delay of 0.5 seconds

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")

  // Animate hamburger icon
  const spans = hamburger.querySelectorAll("span")
  if (mobileMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Close mobile menu when clicking a link
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")

    // Reset hamburger icon
    const spans = hamburger.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  ".section-title, .about-content, .project-card, .skill-card, .contact-content",
)

const revealOnScroll = () => {
  const windowHeight = window.innerHeight

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("fade-in")
    }
  })
}

// Add scroll event listener
window.addEventListener("scroll", revealOnScroll)

// Initial check on page load
window.addEventListener("load", revealOnScroll)

document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();  // Prevent page reload

  let form = document.getElementById("myForm");  // Get form element

  let formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
  };

  fetch("/submit-form/", {  
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === "success") {
          alert("Form submitted successfully!");
          form.reset();  
      } else {
          alert("Error submitting form.");
      }
  })
  .catch(error => console.error("Error:", error));
});