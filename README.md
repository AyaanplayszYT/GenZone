# GenZone

GenZone is a modern web app for generating creative content, including usernames, fake identities, passwords, team names, color palettes, and comics with AI-powered text and images.

## Features
- Multiple generators: Username, Identity, Password, Team Name, Color Palette, Lorem Ipsum, Message, Email Template, Place, Excuse, Pickup Line, Bio, Character
- Comic generator: Create comics using OpenRouter for text and Gemini for images
- AI mode toggle for enhanced creativity
- History and export functionality
- Beautiful dark mode UI

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AyaanplayszYT/GenZone.git
   cd GenZone
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up your `.env` file:
   ```env
   VITE_OPENROUTERKEY=your_openrouter_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

### Running the App
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage
- Use the main page to access all generators.
- Click "Generate Comics" to open the comic creation page.
- Enter your comic idea, generate panels, and view AI-generated images.

## Environment Variables
- `VITE_OPENROUTERKEY`: Your OpenRouter API key for text generation
- `GEMINI_API_KEY`: Your Gemini API key for image generation

## Technologies
- React + TypeScript
- Vite
- Tailwind CSS
- OpenRouter API
- Google Gemini API

## License
MIT

---
Made with ❤️ by AyaanplayszYT
