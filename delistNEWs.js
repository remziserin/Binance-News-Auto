const axios = require('axios');
require('dotenv').config(); // .env dosyasını yükler

// Binance duyuruları URL'si
const url =
  'https://www.binance.com/bapi/composite/v1/public/market/notice/get?page=1&rows=20';

// Telegram Bot bilgileri, .env dosyasından alınır
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Delisting duyurularını saklamak için bir dizi
const delistingNotices = [];

// Telegram Markdown v2 formatı için özel karakterleri kaçırma fonksiyonu
function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

// Telegram'da mesaj gönderme fonksiyonu
async function sendTelegramMessage(message) {
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  try {
    await axios.post(telegramUrl, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'MarkdownV2',
    });
    console.log('Telegram mesajı gönderildi:', message);
  } catch (error) {
    console.error('Telegram mesajı gönderilemedi:', error);
  }
}

// Delisting duyurularını kontrol eden fonksiyon
async function checkForDelisting() {
  try {
    const response = await axios.get(url);
    const data = response.data;

    // Başarılı yanıt kontrolü
    if (data.code === '000000' && data.data) {
      data.data.forEach(async (notice) => {
        // Eğer type "Delisting" ise
        if (notice.type === 'Delisting') {
          // Bu id'yi daha önce kaydetmediğimizi kontrol edelim
          const exists = delistingNotices.some((item) => item.id === notice.id);
          if (!exists) {
            // Delisting duyurusunu kaydet
            delistingNotices.push({
              id: notice.id,
              title: notice.title,
              url: notice.url,
            });
            console.log('Yeni Delisting Duyurusu:', {
              id: notice.id,
              title: notice.title,
              url: notice.url,
            });

            // Telegram mesajı gönder
            const message = `🚨 Yeni Delisting Duyurusu 🚨\n\nBaşlık: [${escapeMarkdown(
              notice.title
            )}](${escapeMarkdown(notice.url)})`;
            await sendTelegramMessage(message);
          }
        }
      });
    } else {
      console.log('Hata oluştu veya veri mevcut değil.');
    }
  } catch (error) {
    console.error('Duyuruları alırken hata oluştu:', error);
  }
}

// 1 dakikada bir kontrol et
setInterval(checkForDelisting, 60000); // 60000 ms = 1 dakika

// Başlangıçta bir kontrol yap
checkForDelisting();
