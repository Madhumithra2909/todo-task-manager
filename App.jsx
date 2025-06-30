import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('todo_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserEmail(parsed.email);
    }
  }, []);

  return (
    <div className="app-wrapper">
      {!userEmail ? (
        <Login setUser={setUserEmail} />
      ) : (
        <Home userEmail={userEmail} setUser={setUserEmail} />
      )}
    </div>
  );
}

export default App;
