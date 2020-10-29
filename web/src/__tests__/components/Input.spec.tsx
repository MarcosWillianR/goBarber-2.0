import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import { FiMail } from 'react-icons/fi';

import { Input } from '../../components/Form';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(getByTestId('input-container')).toHaveStyle(
        'border-color: #ff9000',
      );
      expect(getByTestId('input-container')).toHaveStyle(
        'border-color: #ff9000',
      );
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(getByTestId('input-container')).not.toHaveStyle(
        'border-color: #ff9000',
      );
      expect(getByTestId('input-container')).not.toHaveStyle(
        'border-color: #ff9000',
      );
    });
  });

  it('should keep input border highlight when input field', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" icon={FiMail} />,
    );

    const inputElement = getByPlaceholderText('E-mail');

    fireEvent.change(inputElement, {
      target: { value: 'john_doe@example.com' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(getByTestId('input-icon')).toHaveStyle('color: #ff9000;');
    });
  });
});
