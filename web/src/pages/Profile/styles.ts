import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface AvatarProps {
  url: string | null;
}

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  header {
    background-color: #28262e;

    height: 144px;

    display: flex;
    align-items: center;

    > div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      button {
        background: 0;
        border: 0;

        padding: 12px;

        transition: opacity 0.5s;

        &:hover {
          opacity: 0.8;
        }

        svg {
          color: #999591;
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  place-content: center;
  flex-direction: column;
  align-items: center;

  margin-top: -176px;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    div:nth-of-type(3) {
      margin-bottom: 32px;
    }

    h1 {
      font-size: 22px;
      text-align: left;
      margin-bottom: 34px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;

      transition: color 0.2s ease;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;

    display: flex;
    align-items: center;

    transition: color 0.2s ease;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const AvatarInput = styled.div`
  max-width: 186px;
  margin: 0 auto 32px auto;
  display: flex;
  justify-content: center;
  position: relative;

  label {
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #ff9000;
    border: 0;

    transition: background-color 0.5s;

    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
  }
`;

export const AvatarImage = styled.div<AvatarProps>`
  width: 186px;
  height: 186px;

  ${props =>
    props.url
      ? css`
          background: url(${props.url}) no-repeat 50% 50%;
          background-size: cover;

          svg {
            display: none;
          }

          border: 1px solid #999591;
        `
      : css`
          svg {
            width: 100px;
            height: 100px;
            color: #999591;
            margin-bottom: 3px;
          }
          border: 6px solid #999591;
        `}

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  position: relative;
`;
