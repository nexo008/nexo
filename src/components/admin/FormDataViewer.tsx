import React, { useState, useEffect } from 'react';
import { getLocallyStoredSubmissions, exportLocalSubmissions } from '../../utils/googleSheets';

interface FormSubmission {
  key: string;
  data: Record<string, any>;
  timestamp: string;
  sheetName: string;
}

const FormDataViewer: React.FC = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  useEffect(() => {
    // Load locally stored submissions
    const storedData = getLocallyStoredSubmissions();
    setSubmissions(storedData);
  }, []);
  
  // Filter submissions based on the active tab
  const filteredSubmissions = activeTab === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.sheetName === activeTab);
  
  // Get unique sheet names for the tabs
  const sheetNames = ['all', ...new Set(submissions.map(sub => sub.sheetName))];
  
  // Export data to JSON file
  const handleExport = () => {
    const jsonData = exportLocalSubmissions();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger it
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexo-form-submissions-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Locally Stored Form Submissions</h2>
        <button 
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Export as JSON
        </button>
      </div>
      
      {/* Tabs for filtering by form type */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-4">
          {sheetNames.map(name => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`py-2 px-3 font-medium text-sm rounded-t-md ${
                activeTab === name 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {name === 'all' ? 'All Forms' : name}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Submissions count */}
      <p className="text-gray-600 mb-4">
        {filteredSubmissions.length} submission(s) found
      </p>
      
      {/* Submissions list */}
      {filteredSubmissions.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded text-center text-gray-500">
          No locally stored submissions found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <div 
              key={submission.key} 
              className="border border-gray-200 rounded-md p-4 bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  {submission.sheetName}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(submission.timestamp).toLocaleString()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {Object.entries(submission.data)
                  .filter(([key]) => !key.startsWith('_'))
                  .map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">{key}</span>
                      <span className="text-gray-800">
                        {typeof value === 'boolean' 
                          ? value ? 'Yes' : 'No'
                          : String(value).substring(0, 100) + (String(value).length > 100 ? '...' : '')}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormDataViewer; 