import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (localStorage.getItem('access_token')) {
        setAuth(true);
    }
    
  }, []);
  useEffect(() => {
    console.log("Auth state updated:", auth);
  }, [auth]);

  return auth;
};
