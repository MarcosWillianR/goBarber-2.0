import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    padding: 8px;
    border-radius: 4px;
    background: #ff9000;
    color: #312e38;

    font-size: 14px;
    font-weight: 500;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    opacity: 0;
    visibility: hidden;

    transition: opacity 0.4s;

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);

      border-color: #ff9000 transparent;
      border-style: solid;
      border-width: 6px 6px 0 6px;
    }
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;
