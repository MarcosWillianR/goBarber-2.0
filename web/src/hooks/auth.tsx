import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/apiClient';

interface User {
  id: string;
  avatar_url: string | null;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateAvatar(updateData: Partial<User>): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    const localKeys = ['@GoBarber:token', '@GoBarber:user'];

    localKeys.forEach(keys => {
      localStorage.removeItem(keys);
    });

    api.defaults.headers.authorization = '';

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateAvatar = useCallback(
    updateData => {
      localStorage.setItem(
        '@GoBarber:user',
        JSON.stringify({
          ...data.user,
          ...updateData,
        }),
      );

      setData(state => ({
        token: state.token,
        user: {
          ...state.user,
          ...updateData,
        },
      }));
    },
    [data.user],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
