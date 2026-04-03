// Tiện ích
export const fmt = {
  price: (n)    => Number(n).toLocaleString('vi-VN') + 'đ',
  date:  (d)    => new Date(d).toLocaleDateString('vi-VN'),
  trim:  (s, n=80) => s?.length > n ? s.slice(0, n) + '…' : s,
};

export function debounce(fn, ms = 300) {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

export function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  Object.assign(el.style, { position:'fixed', bottom:'24px', left:'50%', transform:'translateX(-50%)',
    background: type==='success'?'#2a9d8f':'#e63946', color:'#fff', padding:'12px 24px',
    borderRadius:'8px', fontWeight:'600', zIndex:'9999', opacity:'0', transition:'.3s' });
  document.body.appendChild(el);
  requestAnimationFrame(() => el.style.opacity = '1');
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3000);
}

export function renderStars(rating) {
  return Array.from({length:5}, (_, i) => i < rating ? '★' : '☆').join('');
}
