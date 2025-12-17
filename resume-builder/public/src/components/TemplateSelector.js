import React from 'react';

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const templates = [
    { id: 'modern', name: 'Modern', color: 'bg-blue-500', description: 'Clean two-column design' },
    { id: 'classic', name: 'Classic', color: 'bg-gray-500', description: 'Traditional single column' },
    { id: 'executive', name: 'Executive', color: 'bg-green-500', description: 'Professional look' },
    { id: 'creative', name: 'Creative', color: 'bg-purple-500', description: 'For creative fields' },
    { id: 'blank', name: 'Blank', color: 'bg-white border', description: 'Start from scratch' }
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            className={`p-4 rounded-lg border-2 ${selectedTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className={`h-20 ${template.color} rounded mb-2 flex items-center justify-center`}>
              <span className="text-white font-bold">CV</span>
            </div>
            <div className="text-sm font-medium">{template.name}</div>
            <div className="text-xs text-gray-500">{template.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;