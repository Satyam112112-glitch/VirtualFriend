// FAQ toggle functionality
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    answer.classList.toggle("open");
    const icon = question.querySelector("i");
    if (answer.classList.contains("open")) {
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-chevron-up");
    } else {
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    }
  });
});

// Language selector functionality
const languageBtn = document.getElementById("languageBtn");
const languageDropdown = document.getElementById("languageDropdown");
const languageBtnSpan = languageBtn.querySelector("span");

languageBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  languageDropdown.style.display =
    languageDropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
  if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
    languageDropdown.style.display = "none";
  }
});

// Language option selection
document.querySelectorAll(".language-option").forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelectorAll(".language-option").forEach((opt) => {
      opt.classList.remove("active");
    });
    option.classList.add("active");
    languageDropdown.style.display = "none";

    const langName = option.querySelector("span").textContent;
    languageBtnSpan.textContent = langName;
  });
});

// Clear chat functionality
const clearChatBtn = document.getElementById("clearChatBtn");
const chatMessages = document.getElementById("chatMessages");

clearChatBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the chat?")) {
    chatMessages.innerHTML = "";
  }
});

// Mood selector functionality
document.querySelectorAll(".mood-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mood-btn").forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

// Theme toggle functionality
const themeBtn = document.getElementById("themeBtn");
const themeBtnSpan = themeBtn.querySelector("span");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const themeIcon = themeBtn.querySelector("i");
  if (document.body.classList.contains("dark-theme")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    themeBtnSpan.textContent = "Light";
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    themeBtnSpan.textContent = "Theme";
  }
});

// Chat functionality
const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const typingIndicator = document.getElementById("typingIndicator");

sendMessageBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    // Add user message to the chat UI
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    // Clear input and scroll to bottom
    messageInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show typing indicator
    typingIndicator.classList.add("active");
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      // Make a request to your backend server
      const response = await fetch(
        "https://virtualfriend-backend.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: message }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Hide typing indicator
      typingIndicator.classList.remove("active");

      // Add AI's response to the chat UI
      const aiMessage = document.createElement("div");
      aiMessage.classList.add("message", "ai-message");
      aiMessage.textContent = data.message;
      chatMessages.appendChild(aiMessage);

      // Scroll to the bottom of the chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
      console.error("Error:", error);
      typingIndicator.classList.remove("active");
      const errorMessage = document.createElement("div");
      errorMessage.classList.add("message", "ai-message");
      errorMessage.textContent =
        "Oops! Something went wrong. Please try again later.";
      chatMessages.appendChild(errorMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
}
