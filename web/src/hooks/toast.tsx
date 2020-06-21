import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToasContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(toastId: string): void;
}

const ToastContext = createContext<ToasContextData>({} as ToasContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, description, type }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        title,
        description,
        type,
      };

      setMessages(state => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((toastId: string) => {
    if (toastId) {
      setMessages(state => state.filter(message => message.id !== toastId));
    }
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToasContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast precisa do ToastProvider em volta do componente');
  }

  return context;
}

export { ToastProvider, useToast };
