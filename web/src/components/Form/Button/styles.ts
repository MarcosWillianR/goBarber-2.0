import styled, { keyframes } from 'styled-components';
import { FiLoader } from 'react-icons/fi';
import { shade } from 'polished';

const loadingAnim = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s ease;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;

export const Loading = styled(FiLoader)`
  animation: ${loadingAnim} 2s infinite linear;

  color: #312e38;
  width: 22px;
  height: 22px;
`;
