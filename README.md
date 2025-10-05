# 🌙 DreamWave AI

<p align="center">
  <img src="./assets/images/icon.png" width="200" alt="DreamWave AI Logo" />
</p>

<p align="center">
  <b>Transform your sleep into interactive stories and games</b>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

## About

DreamWave AI is a mobile application that transforms sleep and dream data into meaningful interactive content. By analyzing sleep patterns and dream states, the app generates personalized stories, games, and insights to help users better understand and connect with their subconscious mind.

## Features

- **Sleep Tracking** - Monitor sleep stages, quality, and patterns
- **Dream Detection** - Detect and analyze REM sleep for dream content
- **Story Generation** - Create personalized stories based on your dreams
- **Interactive Games** - Play games tailored to your dream themes
- **Dream Journal** - Keep a record of your dreams and their analysis
- **Analytics Dashboard** - Visualize your sleep data and dream patterns

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Unity-000000?style=for-the-badge&logo=unity&logoColor=white" alt="Unity" />
  <img src="https://img.shields.io/badge/AsyncStorage-3178C6?style=for-the-badge&logo=react&logoColor=white" alt="AsyncStorage" />
</p>

### Prerequisites

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Python Documentation](https://docs.python.org/3/)

### For Mobile Development:
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)


##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yash-agarwa-l/dream-wave.git
cd dream-wave
```

---

### 2. Backend Setup (Node.js)

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file (if required):

```env
PORT=3000
MONGO_URI=your_database_url
STABILITY_API_KEY=api_key
```

Start the backend server:

```bash
npm run start
```

✅ The backend server will run on `http://localhost:3000`

---

### 3️⃣ ML Backend Setup (Python)

Navigate to the ML backend directory:

```bash
cd ../ml-backend
```

Create a virtual environment (recommended):

```bash
python -m venv venv
```

Activate the virtual environment:

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the ML backend server:

```bash
python app.py
```

---

### 4️⃣ Mobile App Setup (React Native/Expo)

Navigate to the mobile app directory:

```bash
cd ../app
```

Install dependencies:

```bash
npm install
```

Create required asset directories:

```bash
mkdir -p assets/images
```

Add the following image assets to `assets/images/`:

| File | Description | Size |
|------|-------------|------|
| `icon.png` | App icon | 1024×1024px |
| `splash.png` | Splash screen | 2048×2048px |
| `adaptive-icon.png` | Android adaptive icon | 1024×1024px |
| `favicon.png` | Web favicon | 48×48px |

> 💡 **Tip:** You can use placeholder images initially or generate them using [Figma](https://www.figma.com/) or [Canva](https://www.canva.com/).

---

## 🎮 Running the Application

### Start the Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code in your terminal.

### Launch Options

Once the development server is running, press:

| Key | Action |
|-----|--------|
| `a` | Open on Android emulator/device |
| `i` | Open on iOS simulator/device (macOS only) |
| `w` | Open in web browser |
| `r` | Reload the app |
| `m` | Toggle menu |
| `j` | Open React DevTools |

### 📱 Running on Physical Devices

**Using Expo Go App:**

1. Install the Expo Go app:
   - [Android - Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code displayed in your terminal:
   - **Android:** Use the Expo Go app
   - **iOS:** Use the Camera app (it will open in Expo Go)

---

## 💻 Development Workflow

Run all services simultaneously in separate terminals:

**Terminal 1 - Node.js Backend:**
```bash
cd backend && npm run start
```

**Terminal 2 - ML Backend:**
```bash
cd ml-backend && python app.py
```

**Terminal 3 - Mobile App:**
```bash
cd mobile && npm start
```

> 🔥 **Hot Reload:** The app automatically reloads when you save changes!

---

## 🔧 Troubleshooting

### Clear Expo Cache
```bash
npm start -- --clear
```

### Reset Metro Bundler
```bash
npm start -- --reset-cache
```

### Port Already in Use

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Common Issues

- **Metro bundler error:** Try clearing cache and restarting
- **Module not found:** Run `npm install` again
- **Python dependencies error:** Make sure virtual environment is activated
- **Expo Go connection issues:** Ensure both devices are on the same network

---


### Dashboard

The main dashboard provides an overview of your sleep patterns, current dream detection status, and content generation queue. Pull down to refresh the data.

### Stories

Browse through AI-generated stories based on your dream patterns. Each story reflects emotional themes detected during your sleep.

### Games

Play interactive games that adapt to your dream themes. Games like "Escape the Anxiety Maze" respond to your movements and choices, creating a personalized experience.

### Journal

Track your dream history, including emotional analysis, themes detected, and content generated from each night's sleep.

### Settings

Customize your experience with options for:
- Dark mode toggle
- Notification preferences
- AI dream analysis settings
- Game integrations

## Project Structure

```
dreamwave-ai/
├── app/                   # Main application screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Dashboard screen
│   │   ├── gameplay.tsx   # Games screen
│   │   ├── journal.tsx    # Dream journal screen
│   │   ├── storyline.tsx  # Stories screen
│   │   └── _layout.tsx    # Tab navigation layout
│   ├── game.tsx           # Game screen
│   ├── settings.tsx       # Settings screen
│   └── _layout.tsx        # Root navigation layout
├── assets/                # App assets
│   └── images/            # Image assets
├── components/            # Reusable UI components
├── src/                   # Source code
│   ├── services/          # Business logic and services
│   └── setup/             # Setup utilities
├── global.css             # Global styles
└── tailwind.config.js     # TailwindCSS configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Submissions
https://drive.google.com/file/d/1utHJCGUlbewZQplzUiBkzFCXXZQ1slE7/view?usp=sharing

## Acknowledgements

- Sleep pattern analysis inspired by research from the Sleep Research Society
- Dream analysis techniques based on modern psychology and neuroscience
- Game mechanics designed with input from sleep therapists
