// Simple mini chatbot for 'Incredible Guide'
// Mini chatbot for 'Incredible Guide' (opens only when button is clicked)
const chatbotBtn = document.createElement('button');
chatbotBtn.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#22a63a"/><path d="M10 22c0-2.21 2.69-4 6-4s6 1.79 6 4" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="14" r="1.5" fill="#fff"/><circle cx="20" cy="14" r="1.5" fill="#fff"/></svg>`;
chatbotBtn.style = 'position:fixed;bottom:30px;right:30px;z-index:999;background:transparent;border:none;border-radius:50%;width:48px;height:48px;box-shadow:0 2px 8px #aaa;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;';
document.body.appendChild(chatbotBtn);

let chatbotModal = null;
chatbotBtn.onclick = function() {
  if (!chatbotModal) {
    chatbotModal = document.createElement('div');
    chatbotModal.className = 'modal';
    chatbotModal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.18);z-index:1000;display:flex;align-items:flex-end;justify-content:flex-end;';
    chatbotModal.innerHTML = `
      <div class=\"modal-content\" style=\"max-width:350px;min-width:300px;box-shadow:0 2px 16px #aaa;margin:0 30px 80px 0;\">
        <span class=\"close\" id=\"closeChatbot\" style=\"position:absolute;top:10px;right:20px;font-size:1.5rem;cursor:pointer;\">&times;</span>
        <h2 style=\"text-align:center;color:#22a63a;margin-bottom:10px;\">Incredible Guide</h2>
        <div id=\"chatbotMessages\" style=\"height:180px;overflow-y:auto;background:#f7f7f7;border-radius:10px;padding:10px 8px;margin-bottom:10px;font-size:1rem;\"></div>
        <form id=\"chatbotForm\" style=\"display:flex;gap:5px;\">
          <input type=\"text\" id=\"chatbotInput\" placeholder=\"Ask me anything...\" style=\"flex:1;padding:8px 10px;border-radius:8px;border:1px solid #ccc;\">
          <button type=\"submit\" style=\"background:#22a63a;color:#fff;border:none;border-radius:8px;padding:8px 14px;\">Send</button>
        </form>
      </div>
    `;
    document.body.appendChild(chatbotModal);
    // Close when clicking outside the chat window
    chatbotModal.onclick = function(event) {
      if (event.target === chatbotModal) {
        chatbotModal.classList.add('hidden');
        chatbotModal.style.display = 'none';
      }
    };
    const chatbotMessages = document.getElementById('chatbotMessages');
    function addChatbotMsg(msg, fromUser) {
      const div = document.createElement('div');
      div.textContent = msg;
      div.style = fromUser ? 'text-align:right;margin-bottom:6px;color:#22a63a;' : 'text-align:left;margin-bottom:6px;color:#222;';
      chatbotMessages.appendChild(div);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    addChatbotMsg('Hi! I am your Incredible Guide. How can I help you?', false);
    document.getElementById('chatbotForm').onsubmit = function(e) {
      e.preventDefault();
      const input = document.getElementById('chatbotInput');
      const userMsg = input.value.trim();
      if (!userMsg) return;
      addChatbotMsg(userMsg, true);
      // Simple demo responses
      let botMsg = "I'm here to help!";
      if (/hello|hi|hey/i.test(userMsg)) botMsg = "Hello! How can I assist you today?";
      else if (/trek|trip|price/i.test(userMsg)) botMsg = "You can view trek details and prices on the main page. Want help choosing a trek?";
      else if (/contact|help|guide/i.test(userMsg)) botMsg = "You can reach our helpdesk or WhatsApp for more info. Or ask me here!";
      else if (/book|date/i.test(userMsg)) botMsg = "Click 'Book' on any trek to start your booking.";
      setTimeout(() => addChatbotMsg(botMsg, false), 600);
      input.value = '';
    };
  }
  chatbotModal.classList.remove('hidden');
  // Always re-attach close event to current button
  setTimeout(function() {
    var closeBtn = document.getElementById('closeChatbot');
    if (closeBtn) {
      closeBtn.onclick = function(e) {
        chatbotModal.classList.add('hidden');
        chatbotModal.style.display = 'none';
        e.stopPropagation();
      };
    }
  chatbotModal.style.display = 'flex';
  }, 50);
};
