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

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Clone and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/dreamwave-ai.git
   cd dreamwave-ai
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create necessary asset directories
   ```bash
   mkdir -p assets/images
   ```

4. Add placeholder images for assets
   - Place icons in `assets/images` directory:
     - `icon.png` (1024x1024)
     - `splash.png` (2048x2048)
     - `adaptive-icon.png` (1024x1024)
     - `favicon.png` (48x48)

### Running the App

Start the development server:
```bash
npm start
```

Then follow the instructions in the terminal to open the app:
- Press `a` to open on Android emulator/device
- Press `i` to open on iOS simulator/device
- Press `w` to open in web browser

## Usage

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
