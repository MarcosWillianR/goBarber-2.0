import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import SignUp from '../../pages/SignUp';

import api from '../../services/apiClient';

const apiMocked = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able do sign up', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    apiMocked.onPost('users').reply(201);

    fireEvent.change(getByPlaceholderText('Nome'), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(getByPlaceholderText('E-mail'), {
      target: { value: 'johndoe@example.com' },
    });

    fireEvent.change(getByPlaceholderText('Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText('Cadastrar'));

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it("shouldn't be able do sign up with invalid e-mail", async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    fireEvent.change(getByPlaceholderText('Nome'), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(getByPlaceholderText('E-mail'), {
      target: { value: 'invalid_email' },
    });

    fireEvent.change(getByPlaceholderText('Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText('Cadastrar'));

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display error when registration fails', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    apiMocked.onPost('users').reply(400);

    fireEvent.change(getByPlaceholderText('Nome'), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(getByPlaceholderText('E-mail'), {
      target: { value: 'johndoe@example.com' },
    });

    fireEvent.change(getByPlaceholderText('Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText('Cadastrar'));

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
