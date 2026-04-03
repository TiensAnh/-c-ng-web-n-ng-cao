// Chatbot widget
const btn  = document.getElementById('chatbot-btn');
const box  = document.getElementById('chatbot-box');
const msgs = document.getElementById('chatbot-messages');
const inp  = document.getElementById('chatbot-input');
const send = document.getElementById('chatbot-send');

btn?.addEventListener('click', () => box.classList.toggle('open'));

function addMsg(text, who) {
  const el = document.createElement('div');
  el.className = who === 'bot' ? 'msg-bot' : 'msg-user';
  el.textContent = text;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

async function sendMsg() {
  const msg = inp.value.trim();
  if (!msg) return;
  addMsg(msg, 'user');
  inp.value = '';
  try {
    const data = await fetch('http://localhost:5000/api/chatbot/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
    }).then(r => r.json());
    addMsg(data.reply, 'bot');
  } catch { addMsg('❌ Lỗi kết nối server', 'bot'); }
}

send?.addEventListener('click', sendMsg);
inp?.addEventListener('keydown', e => e.key === 'Enter' && sendMsg());

// Lời chào khi mở
window.addEventListener('load', () => addMsg('👋 Xin chào! Tôi có thể giúp gì cho bạn?', 'bot'));
