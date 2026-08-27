# 🏷️ India Deal Tracker — Smart Shopping Assistant

A powerful React web app to find real discounts, compare prices, analyze deals with AI, and track price history across Indian e-commerce platforms.

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Smart Search** | Search any product and find deals across 6 platforms |
| ⚡ **One-tap Presets** | Mobiles, Headphones, Shoes, Fashion, Kitchen & more |
| ⚙️ **Smart Filters** | Discount % · Star Rating · Sort by · Budget limit |
| 🤖 **AI Deep Analysis** | Claude AI analyzes price history, platform comparison, customer satisfaction & gives best deal URL |
| ⚖️ **Price Comparison** | Smartprix, PriceBefore, BuyHatke, Google Shopping |
| 📈 **Price History** | 1-year price history on Amazon & Flipkart via PriceHistory.app |
| 💳 **Payment Offers** | Best bank card / UPI offers per platform |
| 📊 **EMI Calculator** | See real cost of No-Cost EMI including hidden fees |
| 🗓️ **Sales Calendar** | Upcoming Amazon, Flipkart, Myntra, Meesho sale dates |
| ❤️ **Watchlist** | Save products across sessions |
| 🌙 **Dark Mode** | Easy on eyes while shopping at night |
| 📤 **Share Deals** | Share deal links via WhatsApp or copy |

## 🏪 Supported Platforms

- 🛒 Amazon India
- 🏪 Flipkart
- 🛍️ Meesho
- 👗 Myntra
- 🔖 Snapdeal
- 🏬 Croma

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/india-deal-tracker.git

# Go into the folder
cd india-deal-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder. Deploy to Vercel, Netlify, or GitHub Pages.

## 🤖 AI Review Feature

The AI Review tab uses the **Anthropic Claude API** to analyze products.

When running inside **Claude.ai artifacts**, the API key is handled automatically.

For standalone deployment, add your API key:

```bash
# Create .env file
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

Then update `src/App.jsx` — find the `fetchAIReview` function and add:
```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01"
}
```

> ⚠️ **Note:** For production, never expose your API key in frontend code. Use a backend proxy (Node.js/Express or Vercel serverless function) to make API calls securely.

## 📁 Project Structure

```
india-deal-tracker/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main app — all components in one file
│   ├── main.jsx         # React entry point
│   └── index.css        # Base styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚢 Deploy to Vercel (Free)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select your repo → Deploy
4. Your app is live in 60 seconds!

## 🚢 Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

## 🛣️ Roadmap

- [ ] Real-time price scraping via backend API
- [ ] Browser push notifications for price drops  
- [ ] Barcode scanner (mobile camera)
- [ ] WhatsApp/Telegram bot integration
- [ ] Tamil language support
- [ ] PWA (installable as mobile app)
- [ ] User accounts & shared watchlists

## ⚠️ Disclaimer

- AI price estimates are based on training data, not real-time prices
- Always verify prices on the actual platform before purchasing
- Deal links open real platform pages but availability depends on live stock

## 🧑‍💻 Built With

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Claude AI](https://anthropic.com/) — AI product analysis
- [PriceHistory.app](https://pricehistory.app/) — Price history
- [Smartprix](https://smartprix.com/) — Price comparison

## 📄 License

MIT — free to use and modify.

---

Made with ❤️ for Indian shoppers 🇮🇳
