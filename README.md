# Binance Delisting Bot

## 🚀 Über das Projekt

Dieser Node.js-Bot 🤖 überwacht die Binance-Ankündigungen und sendet eine Benachrichtigung 📢 an Telegram, wenn eine neue "Delisting"-Meldung veröffentlicht wird. Die Daten werden von der offiziellen Binance-API abgerufen.

## ✨ Funktionen

- 🔄 Automatische Überwachung der Binance-Delisting-Ankündigungen alle 60 Sekunden
- 📧 Sendet Benachrichtigungen an Telegram mit Markdown V2 Formatierung
- ⚡ Asynchrone API-Anfragen mit Axios
- 🛠️ Einfache Konfiguration über `.env` Datei

## 🔧 Installation

```bash
# Repository klonen
git clone https://github.com/remziserin/binance-delisting-bot.git
cd binance-delisting-bot

# Abhängigkeiten installieren
npm install
```

## 🛠️ Konfiguration
Erstelle eine `.env` Datei mit den folgenden Parametern:
```env
TELEGRAM_TOKEN=dein-telegram-bot-token
CHAT_ID=deine-chat-id
```

## ⚡ Starten des Bots
```bash
node index.js
```

## 🌟 Kontakt
Falls du Fragen oder Verbesserungsvorschläge hast, kannst du mich über mein GitHub-Profil kontaktieren!

Viel Erfolg! 🚀

