import React from 'react';
import { Plus, FileText } from 'lucide-react';
import SettingsMenu from './SettingsMenu';

const Header = ({ onCreateNote, notes, onImportNotes, onClearAllNotes, onLogout, userEmail }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Notes</h1>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          {userEmail && (
            <span className="hidden md:inline text-sm text-gray-600">{userEmail}</span>
          )}
          <button
            onClick={onCreateNote}
            className="flex items-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">New Note</span>
          </button>
          
          <SettingsMenu
            notes={notes}
            onImportNotes={onImportNotes}
            onClearAllNotes={onClearAllNotes}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;