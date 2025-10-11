import React from 'react';
import NoteItem from './NoteItem';

const Sidebar = ({ notes, selectedNoteId, onSelectNote, onDeleteNote, onTogglePin }) => {
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  return (
    <div className="flex-1 overflow-y-auto">
      {pinnedNotes.length > 0 && (
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Pinned</h3>
          <div className="space-y-2">
            {pinnedNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                isSelected={note.id === selectedNoteId}
                onSelect={() => onSelectNote(note.id)}
                onDelete={() => onDeleteNote(note.id)}
                onTogglePin={() => onTogglePin(note.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      {unpinnedNotes.length > 0 && (
        <div className="p-4">
          {pinnedNotes.length > 0 && (
            <h3 className="text-sm font-medium text-gray-500 mb-3">Notes</h3>
          )}
          <div className="space-y-2">
            {unpinnedNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                isSelected={note.id === selectedNoteId}
                onSelect={() => onSelectNote(note.id)}
                onDelete={() => onDeleteNote(note.id)}
                onTogglePin={() => onTogglePin(note.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      {notes.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          <p>No notes found</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;