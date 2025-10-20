import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import { useFirebaseNotes } from './hooks/useFirebaseNotes';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);
  const { notes, loading, createNote: createNoteDB, updateNote: updateNoteDB, deleteNote: deleteNoteDB } = useFirebaseNotes();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchInputRef = useRef(null);

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  const createNote = async () => {
    const newNote = {
      title: 'Untitled Note',
      content: '',
      category: 'general',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_pinned: false,
      tags: []
    };
    try {
      const createdNote = await createNoteDB(newNote);
      setSelectedNoteId(createdNote.id);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      await updateNoteDB({
        ...updatedNote,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await deleteNoteDB(noteId);
      if (selectedNoteId === noteId) {
        setSelectedNoteId(null);
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const togglePin = async (noteId) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      await updateNote({ ...note, is_pinned: !note.is_pinned });
    }
  };

  const importNotes = (importedNotes) => {
    if (Array.isArray(importedNotes)) {
      const validNotes = importedNotes.filter(note => 
        note.id && note.title !== undefined && note.content !== undefined
      );
      setNotes([...validNotes, ...notes]);
      if (validNotes.length > 0) {
        setSelectedNoteId(validNotes[0].id);
      }
    }
  };

  const clearAllNotes = () => {
    setNotes([]);
    setSelectedNoteId(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        setShowLanding(false);
        setPageTransition(true);
        setTimeout(() => {
          navigate('/notes');
          setTimeout(() => setPageTransition(false), 300);
        }, 500);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (notes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(notes[0].id);
    }
  }, [notes, selectedNoteId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        createNote();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [notes]);

  const handleLogout = async () => {
    try {
      setPageTransition(true);
      await signOut(auth);
      setTimeout(() => {
        navigate('/');
        setShowLanding(true);
        setTimeout(() => setPageTransition(false), 300);
      }, 300);
    } catch (error) {
      console.error('Error signing out:', error);
      setPageTransition(false);
    }
  };

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const NotesPage = () => (
    <div className={`h-screen bg-white flex flex-col transition-opacity duration-500 ${
      pageTransition ? 'opacity-0' : 'opacity-100'
    }`}>
      <Header 
        onCreateNote={createNote}
        notes={notes}
        onImportNotes={importNotes}
        onClearAllNotes={clearAllNotes}
        onLogout={handleLogout}
        userEmail={user?.email}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static fixed inset-y-0 left-0 z-50
          w-full max-w-sm md:w-80 bg-gray-50 border-r border-gray-200 flex flex-col
          transition-transform duration-300 ease-in-out
        `}>
          <SearchBar 
            ref={searchInputRef}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <Sidebar
            notes={sortedNotes}
            selectedNoteId={selectedNoteId}
            onSelectNote={(id) => {
              setSelectedNoteId(id);
              setIsSidebarOpen(false);
            }}
            onDeleteNote={deleteNote}
            onTogglePin={togglePin}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-gray-500">Loading notes...</div>
            </div>
          ) : notes.length === 0 ? (
            <EmptyState onCreateNote={createNote} />
          ) : (
            <NoteEditor
              note={selectedNote}
              onUpdateNote={updateNote}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              isMobile={true}
            />
          )}
        </div>
      </div>
      
      <KeyboardShortcuts />
    </div>
  );

  return (
    <>
      {pageTransition && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center animate-fadeIn">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 animate-pulse">Loading your notes...</p>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/notes" replace /> : 
          showLanding ? <LandingPage onGetStarted={() => setShowLanding(false)} /> : 
          <Navigate to="/login" replace />
        } />
        <Route path="/login" element={
          user ? <Navigate to="/notes" replace /> : <Login onSuccess={() => {}} />
        } />
        <Route path="/notes" element={
          user ? <NotesPage /> : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;