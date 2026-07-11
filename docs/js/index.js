const form = document.getElementById('trial-form');
const phone = document.getElementById('phone');
const message = document.getElementById('message');
const notification = document.getElementById('notification');

function isValidRussianPhone(phoneInput) {
  const digits = phoneInput.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (digits[0] !== '7' && digits[0] !== '8') return false;
  const operatorCode = digits.substring(1, 4);
  if (operatorCode[0] === '0') return false;
  return true;
}

function showNotification(icon, message, color) {
  notification.innerHTML = '<span class="notification-icon">' + icon + '</span> ' + message;
  notification.style.background = 'linear-gradient(135deg, ' + color + ', ' + color + 'cc)';
  notification.classList.add('show');
  setTimeout(function() {
    notification.classList.remove('show');
  }, 3000);
}

phone.addEventListener('input', function(e) {
  let value = this.value.replace(/\D/g, '');
  if (value.length > 11) value = value.substring(0, 11);
  let formatted = '+7';
  if (value.length > 1) formatted += ' (' + value.substring(1, 4);
  if (value.length >= 4) formatted += ') ' + value.substring(4, 7);
  if (value.length >= 7) formatted += '-' + value.substring(7, 9);
  if (value.length >= 9) formatted += '-' + value.substring(9, 11);
  this.value = formatted;
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (!isValidRussianPhone(phone.value)) {
    showNotification(
      '⚠️',
      'Введите номер в формате:<br />+7 (XXX) XXX-XX-XX',
      '#ef4444'
    );
    phone.focus();
    return;
  }
  fetch('https://script.google.com/macros/s/AKfycbyHYuaMnu5-yejE5ANLAhsMm6ujsK3wIjGwF1mHpc-e3x_8LMkNLRsulqHDIRpZ68Y3/exec', {
    method: 'POST',
    body: JSON.stringify({
      telephone: phone.value.trim(),
      message: message.value.trim()
    })
  });
  showNotification('✅', 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.', '#3b82f6');
  form.reset();
});
