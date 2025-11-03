// Stat counter
const counters = document.querySelectorAll(".count");
let started = false;

function startCount() {
  if (!started) {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const speed = 40;
      const updateCount = () => {
        const current = +counter.innerText;
        const increment = target / 80;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, speed);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
    started = true;
  }
}

// Scroll-triggered fade-in
const animatedElements = document.querySelectorAll(".animate");

function showOnScroll() {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

// Event listeners
window.addEventListener("scroll", () => {
  const stats = document.querySelector(".stats");
  if (stats) {
    const rect = stats.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) startCount();
  }
  showOnScroll();
});

// Mentorship Chat functionality
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

const botResponses = [
  "Hi there! How can I help you today?",
  "Remember to stay focused and set clear goals.",
  "Networking is key! Connect with mentors and peers.",
  "You should check out our Training Hub for skill development.",
  "Persistence is important. Keep trying and learning.",
  "Funding opportunities are listed in the Funding Access page.",
  "Always ask questions and never hesitate to seek guidance."
];

function addMessage(message, sender) {
  const div = document.createElement("div");
  div.classList.add("chat-message");
  div.classList.add(sender === "user" ? "user-message" : "bot-message");
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;
  addMessage(message, "user");
  userInput.value = "";

  setTimeout(() => {
    const botReply = botResponses[Math.floor(Math.random() * botResponses.length)];
    addMessage(botReply, "bot");
  }, 800);
});


window.addEventListener("load", showOnScroll);
