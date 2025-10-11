import React, { useState, useEffect } from 'react';
import { Save, Tag, Calendar, Folder, Download, Menu } from 'lucide-react';
import { exportToText } from '../utils/exportUtils';

const NoteEditor = ({ note, onUpdateNote, onToggleSidebar, isMobile }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
      setTags(note.tags?.join(', ') || '');
      setIsModified(false);
    }
  }, [note]);

  const handleSave = () => {
    if (note && isModified) {
      const updatedNote = {
        ...note,
        title: title || 'Untitled Note',
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      onUpdateNote(updatedNote);
      setIsModified(false);
    }
  };

  const handleChange = (field, value) => {
    setIsModified(true);
    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'content':
        setContent(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'tags':
        setTags(value);
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModified, note]);

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No note selected</h3>
          <p className="text-gray-500">Select a note from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'ideas', label: 'Ideas' }
  ];

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharCount = (text) => {
    return text.length;
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            {isMobile && (
              <button
                onClick={onToggleSidebar}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Note title..."
              className="text-xl md:text-2xl font-semibold text-gray-900 bg-transparent border-none outline-none flex-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportToText(note)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              disabled={!isModified}
              className={`flex items-center space-x-2 px-2 md:px-4 py-2 rounded-lg transition-colors ${
                isModified
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span className="text-xs sm:text-sm">
              {new Date(note.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Folder className="w-4 h-4" />
            <select
              value={category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* <div className="flex items-center space-x-2 flex-1">
            <Tag className="w-4 h-4" />
            <input
              type="text"
              value={tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="Add tags"
              className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 min-w-0"
            />
          </div> */}
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder="Start writing your note..."
          className="w-full h-full resize-none border-none outline-none text-gray-900 leading-relaxed text-sm md:text-base"
        />
      </div>
      
      <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500">
            <span>{getWordCount(content)} words</span>
            <span>{getCharCount(content)} characters</span>
          </div>
          {isModified && (
            <p className="text-xs sm:text-sm text-yellow-600">
              Unsaved • Ctrl+S to save
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;