// Replace with your HuggingFace API key
const API_KEY = "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";

// Call HuggingFace Gemma model
async function callAI(message) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/gemma-2b-it",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${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}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: message
      })
    }
  );

  const data = await response.json();

  // HuggingFace returns an array of outputs
  if (data && data[0] && data[0].generated_text) {
    return data[0].generated_text;
  } else {
    return "⚠️ Error: No response from Gemma.";
  }
}

// Add message to chatbox
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

  // Temporary placeholder
  addMessage("AI", "Thinking...");

  try {
    const aiReply = await callAI(text);

    // Replace "Thinking..." with real response
    const chatbox = document.getElementById("chatbox");
    chatbox.lastChild.innerHTML = `<b>AI:</b> ${aiReply}`;
  } catch (err) {
    const chatbox = document.getElementById("chatbox");
    chatbox.lastChild.innerHTML = `<b>AI:</b> ⚠️ Error calling Gemma: ${err.message}`;
  }
}
