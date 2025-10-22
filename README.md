# NotesApp

A modern, intuitive note-taking application built with React and Firebase, designed to help you capture, organize, and find your thoughts effortlessly.

## ✨ Features

### Core Functionality
- **Real-time Note Management** - Create, edit, and delete notes with instant synchronization
- **Smart Search** - Find notes quickly by title or content
- **Category Organization** - Organize notes with customizable categories
- **Pin Important Notes** - Keep your most important notes at the top
- **Rich Text Editing** - Clean, distraction-free writing experience

### User Experience
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Keyboard Shortcuts** - Boost productivity with quick keyboard commands
- **Dark/Light Theme Support** - Comfortable viewing in any environment
- **Offline Capability** - Continue working even without internet connection

### Security & Sync
- **Firebase Authentication** - Secure user authentication and authorization
- **Real-time Synchronization** - Your notes sync across all devices instantly
- **Data Persistence** - Never lose your notes with reliable cloud storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd note-taking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication and Firestore Database
   - Copy your Firebase configuration
   - Create `.env.local` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful, customizable icons

### Backend & Database
- **Firebase Authentication** - User authentication and session management
- **Firestore** - NoSQL document database for real-time data
- **Firebase Hosting** - Fast and secure web hosting

### Build Tools
- **Vite** - Fast build tool and development server
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # App header with navigation
│   ├── Sidebar.jsx     # Notes list sidebar
│   ├── NoteEditor.jsx  # Main note editing interface
│   ├── SearchBar.jsx   # Search and filter functionality
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useFirebaseNotes.js  # Firebase notes operations
│   └── useLocalStorage.js   # Local storage utilities
├── lib/                # External service configurations
│   └── supabase.js     # Supabase client setup
├── utils/              # Utility functions
│   └── exportUtils.js  # Note export functionality
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + N` - Create new note
- `Ctrl/Cmd + F` - Focus search bar
- `Ctrl/Cmd + S` - Save current note (auto-save enabled)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch


## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Built with ❤️ for creators everywhere
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Firebase](https://firebase.google.com/)

---

**Made with ❤️ for thoughtful creators**