# Firebase Setup Instructions

## ✅ What's Been Done

1. **Firebase Configuration** - Created `src/firebase.js` with environment variables
2. **Authentication Components** - Created `Login.jsx` and `Signup.jsx` with:
   - Email/Password authentication
   - Google Sign-In
   - Password visibility toggle
   - Error handling
3. **Firestore Database Hook** - Created `useFirebaseNotes.js` to replace Supabase
4. **App Integration** - Updated `App.jsx` with authentication flow
5. **Environment Variables** - Updated `.env.local` with Firebase config

## 🔧 Firebase Console Setup Required

### Step 1: Enable Authentication Methods
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `notes-taking-web`
3. Navigate to **Authentication** → **Sign-in method**
4. Enable:
   - **Email/Password** (click Enable and Save)
   - **Google** (click Enable, add support email, Save)

### Step 2: Create Firestore Database
1. Navigate to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (we'll add rules next)
4. Select your preferred location
5. Click **Enable**

### Step 3: Set Firestore Security Rules
Go to **Firestore Database** → **Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /notes/{noteId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

Click **Publish**

### Step 4: Add Authorized Domain (for Google Sign-In)
1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add `localhost` (should already be there)
3. Add your production domain when deploying

## 🚀 Running the App

```bash
npm run dev
```

## 📁 Database Structure

```
users/
  {userId}/
    notes/
      {noteId}/
        - title: string
        - content: string
        - category: string
        - tags: array
        - is_pinned: boolean
        - created_at: timestamp
        - updated_at: timestamp
```

## ✨ Features

- ✅ Email/Password Sign Up & Login
- ✅ Google Sign-In
- ✅ Real-time note synchronization
- ✅ User-specific notes (isolated per user)
- ✅ Automatic authentication state management
- ✅ Logout functionality
- ✅ Secure Firestore rules

## 🔐 Security

- API keys are in `.env.local` (not committed to git)
- Firestore rules ensure users can only access their own notes
- Authentication required for all database operations
