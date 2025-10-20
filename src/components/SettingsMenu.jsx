import React, { useState, useRef } from 'react';
import { Settings, Download, Upload, Trash2, MoreVertical, LogOut } from 'lucide-react';
import { exportToJSON, importFromJSON } from '../utils/exportUtils';

const SettingsMenu = ({ notes, onImportNotes, onClearAllNotes, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    exportToJSON(notes);
    setIsOpen(false);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
    setIsOpen(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const importedNotes = await importFromJSON(file);
        onImportNotes(importedNotes);
      } catch (error) {
        alert('Failed to import notes: ' + error.message);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all notes? This action cannot be undone.')) {
      onClearAllNotes();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 animate-slideDown">
            <button
              onClick={handleExport}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-all duration-200 hover:pl-5"
            >
              <Download className="w-4 h-4" />
              <span>Export Notes</span>
            </button>
            
            <button
              onClick={handleImport}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-all duration-200 hover:pl-5"
            >
              <Upload className="w-4 h-4" />
              <span>Import Notes</span>
            </button>
            
            <hr className="my-2 border-gray-200" />
            
            <button
              onClick={handleClearAll}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-all duration-200 hover:pl-5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Notes</span>
            </button>
            
            {onLogout && (
              <>
                <hr className="my-2 border-gray-200" />
                <button
                  onClick={() => { onLogout(); setIsOpen(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-all duration-200 hover:pl-5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default SettingsMenu;