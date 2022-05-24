import React from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [data, setData] = React.useState(() => {
    const token = localStorage.getItem('@TODO:token');
    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return token;
    }
    return '';
  });
  const signIn = async ({ email, password }) => {
    try {
      const response = await api.post('/auth', { email, password });
      setData(response.data);

      localStorage.setItem('@TODO:token', response.data.token);
      api.defaults.headers.authorization = `Bearer ${response.data.token}`;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };
  const getEmail = ({ email }) => email;

  const signOut = () => {
    localStorage.removeItem('@TODO:token');
    setData({});
  };

  return (
    <AuthContext.Provider value={{
      signIn, signOut, getEmail, token: data,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used with a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
