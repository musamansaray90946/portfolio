import React from 'react';
import { Download, Printer, Save, Share2, Columns } from 'lucide-react';

const Toolbar = ({ resumeData, selectedTemplate, isTwoColumn, setIsTwoColumn }) => {
  const handleDownload = () => {
    // Implement download as PDF
    alert('PDF download functionality would be implemented here');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('Resume saved locally!');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'resume.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-blue-600">ResumeBuilder Pro</h1>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">FREE</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsTwoColumn(!isTwoColumn)}
              className={`p-2 rounded-lg ${isTwoColumn ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              title="Toggle two-column layout"
            >
              <Columns size={20} />
            </button>
            
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Save size={18} />
              <span>Save</span>
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              <Share2 size={18} />
              <span>Export</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Download size={18} />
              <span>Download PDF</span>
            </button>
            
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <Printer size={18} />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;