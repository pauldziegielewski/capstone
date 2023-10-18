import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      // Prevent multiple logout attempts
      return;
    }

    setIsLoggingOut(true);

    try {
      // Send a request to your logout endpoint
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Logout was successful, redirect to the login page
        navigate('/login');
      } else {
        console.error('Logout failed:', response.status, response.statusText);
        // Handle logout failure, e.g., show an error message
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Handle network or other errors gracefully, e.g., show an error message
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? 'Logging Out...' : 'Logout'}
    </button>
  );
}
