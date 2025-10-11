import React, { useState } from 'react';
import { Pin, Trash2, MoreVertical } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const NoteItem = ({ note, isSelected, onSelect, onDelete, onTogglePin }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div
      className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-colors group ${
        isSelected 
          ? 'bg-blue-50 border border-blue-200' 
          : 'bg-white border border-gray-200 hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-sm sm:text-base text-gray-900 truncate">
              {note.title || 'Untitled Note'}
            </h4>
            {note.is_pinned && (
              <Pin className="w-3 h-3 text-blue-600 flex-shrink-0" />
            )}
          </div>
          
          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
            {truncateContent(note.content, 80) || 'No content'}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {formatDate(note.updated_at)}
            </span>
            <span className="text-xs text-blue-600 bg-blue-100 px-1 sm:px-2 py-1 rounded">
              {note.category}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin();
            }}
            className={`p-2 sm:p-1 rounded hover:bg-gray-200 ${
              note.is_pinned ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Pin className="w-4 h-4 sm:w-3 sm:h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            className="p-2 sm:p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4 sm:w-3 sm:h-3" />
          </button>
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          onDelete();
          setShowDeleteDialog(false);
        }}
        title="Delete Note"
        message={`Are you sure you want to delete "${note.title || 'Untitled Note'}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default NoteItem;