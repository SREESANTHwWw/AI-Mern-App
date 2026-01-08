# MERN AI Flow Application

A MERN stack application that demonstrates connecting multiple technologies together by visualizing an AI prompt flow using **React Flow**.  
Users can enter a prompt, run the AI flow, view the response in a connected node, and save the prompt-response pair to **MongoDB**.

---

## 🎯 Project Goal

This project was built as part of a developer task to demonstrate:

- Reading and implementing documentation
- Connecting frontend, backend, AI APIs, and database
- Secure API handling
- Clean UI logic with data persistence

---


---

## 🚀 Running the Frontend Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation


https://github.com/SREESANTHwWw/AI-Mern-App
cd Client
npm install

npm run dev



## 🧠 Tech Stack

### Frontend
- React.js
- React Flow
- Axios
- Tailwind
- Redux Toolkit

### Backend
- Node.js
- Express.js
- OpenRouter API (Free AI model)

### Database
- MongoDB (Atlas)

---

## ⚙️ Features

- Flow-based UI using **React Flow**
- Prompt input node and AI result node connected by an edge
- Secure backend AI API call (no API key exposed)
- Uses free OpenRouter AI model
- Save prompt & response to MongoDB
- Simple and clean UI

---

## 📁 Project Structure
CLIENT/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── Components/
│   │   ├── Loading/
│   │   ├── Prompt.tsx        # Input Node
│   │   ├── Response.tsx      # Result Node
│   │   ├── SendButton.tsx    # Run Flow Button
│   │   └── SideBar.tsx
│   │
│   ├── PromptSlice/
│   │   └── PromptSlice.ts    # Redux Slice
│   │
│   ├── Store/
│   │   └── Store.ts          # Redux Store
│   │
│   ├── App.tsx               # React Flow setup
│   ├── main.tsx
│   ├── App.css
│   ├── index.css
│   └── Server.ts             # Backend API logic
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md


