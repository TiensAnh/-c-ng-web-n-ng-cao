// Chatbot tư vấn tour (AI đơn giản + rule-based)
const db = require('../config/db');

const INTENTS = [
  { keys: ['xin chào','chào','hello','hi'],   reply: '👋 Xin chào! Tôi là trợ lý du lịch. Bạn muốn đi đâu hôm nay?' },
  { keys: ['tour rẻ','giá rẻ','tiết kiệm'],  reply: '💰 Tôi sẽ tìm tour giá tốt cho bạn!', action: 'cheapTours' },
  { keys: ['hủy','hủy tour'],                 reply: '❌ Bạn có thể hủy tour trong vòng 24h sau khi đặt. Vào mục "Lịch sử đặt tour" để thực hiện.' },
  { keys: ['thanh toán','trả tiền'],          reply: '💳 Chúng tôi hỗ trợ thanh toán VNPay, Momo và chuyển khoản ngân hàng.' },
  { keys: ['liên hệ','hotline','hỗ trợ'],     reply: '📞 Hotline: 1800-1234 | Email: support@travel.vn | Làm việc 8h-22h hàng ngày.' },
];

exports.chat = async (req, res) => {
  try {
    const msg = (req.body.message || '').toLowerCase().trim();

    for (const intent of INTENTS) {
      if (intent.keys.some(k => msg.includes(k))) {
        let reply = intent.reply;

        if (intent.action === 'cheapTours') {
          const [tours] = await db.query('SELECT name,price,location FROM tours WHERE status="active" ORDER BY price ASC LIMIT 3');
          reply += '\n\n🌏 Tour giá tốt nhất:\n' + tours.map(t => `• ${t.name} — ${t.location} — ${Number(t.price).toLocaleString('vi-VN')}đ`).join('\n');
        }

        return res.json({ reply });
      }
    }

    // Tìm tour theo tên địa điểm
    const [tours] = await db.query('SELECT name,price,location FROM tours WHERE status="active" AND (name LIKE ? OR location LIKE ?) LIMIT 3', [`%${msg}%`, `%${msg}%`]);
    if (tours.length) {
      const list = tours.map(t => `• ${t.name} — ${t.location} — ${Number(t.price).toLocaleString('vi-VN')}đ`).join('\n');
      return res.json({ reply: `🔍 Tìm thấy ${tours.length} tour phù hợp:\n${list}` });
    }

    res.json({ reply: '🤔 Tôi chưa hiểu câu hỏi của bạn. Thử hỏi về điểm đến, giá tour hoặc cách đặt tour nhé!' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
