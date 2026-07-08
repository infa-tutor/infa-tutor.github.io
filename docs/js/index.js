const form = document.getElementById('trial-form');
const notification = document.getElementById('notification');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const telephone = document.getElementById('phone').value.trim();
    if (!telephone) {
        // Уведомление об ошибке
        notification.innerHTML = '<span class="notification-icon">⚠️</span> Пожалуйста, введите номер телефона';
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        showNotification();
        return;
    }
    const message = document.getElementById('message').value.trim();

    fetch('https://script.google.com/macros/s/AKfycbyHYuaMnu5-yejE5ANLAhsMm6ujsK3wIjGwF1mHpc-e3x_8LMkNLRsulqHDIRpZ68Y3/exec', {
      method: 'POST',
      body: JSON.stringify({
        telephone: telephone,
        message: message
      })
    });

    notification.innerHTML = '<span class="notification-icon">✅</span> Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.';
    notification.style.background = 'linear-gradient(135deg, #3b82f6, #6366f1)';
    showNotification();
    form.reset();
});

function showNotification() {
  notification.classList.add('show');
  setTimeout(function() {
    notification.classList.remove('show');
  }, 3000);
}
