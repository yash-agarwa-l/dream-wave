🌙 DreamWave AI
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
<a href="#running-the-full-stack">Usage</a> •
<a href="#project-structure">Project Structure</a> •
<a href="#contributing">Contributing</a> •
<a href="#license">License</a>
</p>

About
DreamWave AI is a full-stack mobile application that transforms sleep and dream data into meaningful interactive content. By analyzing sleep patterns and dream states with a dedicated ML service, the app generates personalized stories, games, and insights to help users better understand and connect with their subconscious mind.

Features
Sleep Tracking - Monitor sleep stages, quality, and patterns

Dream Detection - Detect and analyze REM sleep for dream content

AI Story Generation - Create personalized stories based on your dreams

Interactive Games - Play games tailored to your dream themes

Dream Journal - Keep a record of your dreams and their analysis

Analytics Dashboard - Visualize your sleep data and dream patterns

Tech Stack
Frontend (Mobile App)
<p>
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
<img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
</p>

Backend & ML
<p>
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Node.js-339933%3Fstyle%3Dfor-the-badge%26logo%3Dnodedotjs%26logoColor%3Dwhite" alt="Node.js" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Express-000000%3Fstyle%3Dfor-the-badge%26logo%3Dexpress%26logoColor%3Dwhite" alt="Express" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Python-3776AB%3Fstyle%3Dfor-the-badge%26logo%3Dpython%26logoColor%3Dwhite" alt="Python" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/MongoDB-47A248%3Fstyle%3Dfor-the-badge%26logo%3Dmongodb%26logoColor%3Dwhite" alt="MongoDB" />
</p>

Installation
This project is a monorepo containing three parts: the mobile app (frontend), the server (backend), and the machine learning service.

Prerequisites
Node.js (v16 or newer)

Python (v3.8 or newer) & pip

Expo CLI

Git

Clone the Repository
git clone [https://github.com/yourusername/dreamwave-ai.git](https://github.com/yourusername/dreamwave-ai.git)
cd dreamwave-ai

1. Backend Setup (Node.js)
Navigate to the backend directory, install dependencies, and set up your environment variables.

cd backend
npm install

Next, create a .env file by copying the example file:

cp .env.example .env

Now, open the .env file and add your database connection string, API keys, etc.

2. ML Service Setup (Python)
Navigate to the ML service directory, create and activate a virtual environment, and install the required Python packages.

cd ../ml-backend

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies from the requirements file
pip install -r requirements.txt

3. Frontend Setup (React Native App)
Navigate back to the root directory and install the app's dependencies.

cd ..
npm install

Finally, ensure you have the necessary image assets in place.

Place icons in assets/images directory:

icon.png (1024x1024)

splash.png (2048x2048)

adaptive-icon.png (1024x1024)

favicon.png (48x48)

Running the Full Stack
To run the complete application, you must start all three services. We recommend using three separate terminal windows.

Terminal 1: Start the Backend Server
# Navigate to the backend directory
cd backend

# Start the server
npm run start

Terminal 2: Start the ML Service
# Navigate to the ML directory
cd ml-backend

# Activate the virtual environment if not already active
source venv/bin/activate

# Run the Python service (e.g., using Flask or FastAPI)
python app.py

Terminal 3: Start the Frontend App
# In the root project directory
npm start

Then follow the instructions in the terminal to open the app on your desired platform (Android, iOS, or web).

Project Structure
dreamwave-ai/
├── app/                  # Main application screens (React Native)
│   ├── (tabs)/
│   └── ...
├── assets/               # App assets (images, fonts)
├── backend/              # Node.js Express server
│   ├── src/
│   ├── package.json
│   └── .env.example
├── components/           # Reusable UI components
├── ml-backend/           # Python ML service (Flask/FastAPI)
│   ├── venv/
│   ├── app.py
│   └── requirements.txt
├── package.json          # Frontend dependencies
└── tailwind.config.js

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.

Submissions
https://drive.google.com/file/d/1utHJCGUlbewZQplzUiBkzFCXXZQ1slE7/view?usp=sharing

Acknowledgements
Sleep pattern analysis inspired by research from the Sleep Research Society

Dream analysis techniques based on modern psychology and neuroscience

Game mechanics designed with input from sleep therapists
