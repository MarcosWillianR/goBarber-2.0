import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import ResetPassword from '../../pages/ResetPassword';

import api from '../../services/apiClient';

const apiMocked = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedUrlParser = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useLocation: jest.fn(),
    useHistory: () => ({ push: mockedHistoryPush }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('../../utils/UrlParser', () => {
  return {
    UrlParser: () => mockedUrlParser,
  };
});

describe('ResetPassword page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedUrlParser.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to reset password', async () => {
    mockedUrlParser.mockImplementation(() => ({ token: 'uuid' }));

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    apiMocked.onPost('/password/reset').reply(200);

    fireEvent.change(getByPlaceholderText('Nova senha'), {
      target: { value: '123456' },
    });

    fireEvent.change(getByPlaceholderText('Confirmação de Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText('Redefinir'));

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it("shouldn't be able to reset password with invalid password confirmation", async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    fireEvent.change(getByPlaceholderText('Nova senha'), {
      target: { value: '1234567' },
    });

    fireEvent.change(getByPlaceholderText('Confirmação de Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText('Redefinir'));

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it("shouldn't be able to reset password without an reset token", async () => {
    mockedUrlParser.mockImplementation(() => ({ token: null }));

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    fireEvent.change(getByPlaceholderText('Nova senha'), {
      target: { value: '123456' },
    });

    fireEvent.change(getByPlaceholderText('Confirmação de Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText('Redefinir'));

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should display a error when try to reset password', async () => {
    mockedUrlParser.mockImplementation(() => ({ token: 'uuid' }));

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    apiMocked.onPost('/password/reset').reply(400);

    fireEvent.change(getByPlaceholderText('Nova senha'), {
      target: { value: '123456' },
    });

    fireEvent.change(getByPlaceholderText('Confirmação de Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText('Redefinir'));

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
