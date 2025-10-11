import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import { useSupabaseNotes } from './hooks/useSupabaseNotes';

function App() {
  const { notes, loading, createNote: createNoteDB, updateNote: updateNoteDB, deleteNote: deleteNoteDB } = useSupabaseNotes();
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

  return (
    <div className="h-screen bg-white flex flex-col">
      <Header 
        onCreateNote={createNote}
        notes={notes}
        onImportNotes={importNotes}
        onClearAllNotes={clearAllNotes}
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
          w-80 bg-gray-50 border-r border-gray-200 flex flex-col
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
}

export default App;