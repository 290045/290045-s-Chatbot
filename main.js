// Call your backend proxy instead of HuggingFace directly
async function callAI(message) {
  const response = await fetch("https://290045s-chatbot-flts05sy4-290045.vercel.app/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  return data[0].generated_text;
}

// Add a message to the chatbox
function addMessage(sender, text) {
  const chatbox = document.getElementById("chatbox");
  const msg = document.createElement("div");
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Handle sending user input
async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text);
  input.value = "";

  // Temporary "thinking" message
  addMessage("AI", "Thinking...");

  try {
    const aiReply = await callAI(text);

    const chatbox = document.getElementById("chatbox");
    chatbox.lastChild.innerHTML = `<b>AI:</b> ${aiReply}`;
  } catch (err) {
    const chatbox = document.getElementById("chatbox");
    chatbox.lastChild.innerHTML = `<b>AI:</b> ⚠️ Error calling backend: ${err.message}`;
  }
}

// Allow pressing Enter to send
document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
