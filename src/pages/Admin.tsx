import React, { useState } from 'react';
import Layout from '../components/Layout';
import FormDataViewer from '../components/admin/FormDataViewer';

const Admin: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Simple authentication - in a real app, use proper auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password for demo purposes - use proper authentication in production
    if (password === 'nexoadmin') {
      setAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Admin Dashboard
      </h1>
      
      {!authenticated ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-12">
          <div className="grid gap-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-blue-800">Form Submissions</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <FormDataViewer />
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 