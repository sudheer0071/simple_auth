import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (userToken) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);

    try {
      const response = await fetch(
        'https://assignment1.sudheer.tech/api/current-user',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to fetch current user:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
