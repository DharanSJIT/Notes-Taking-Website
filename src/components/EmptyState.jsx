import React from 'react';
import { FileText, Plus } from 'lucide-react';

const EmptyState = ({ onCreateNote }) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 animate-fadeIn">
      <div className="text-center max-w-md animate-slideInFromLeft">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <FileText className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Welcome to Notes
        </h3>
        <p className="text-gray-600 mb-6">
          Create your first note to get started. Organize your thoughts, ideas, and important information all in one place.
        </p>
        <button
          onClick={onCreateNote}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Create Your First Note</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;