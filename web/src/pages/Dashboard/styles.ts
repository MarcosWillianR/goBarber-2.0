import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface AvatarProps {
  url: string | null;
  size?: number;
  svgSize?: number;
}

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background-color: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    padding: 12px;

    border: 0;
    background-color: transparent;

    svg {
      width: 20px;
      height: 20px;
      color: #999591;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  margin-left: 80px;

  div:nth-child(2) {
    margin-left: 16px;

    display: flex;
    flex-direction: column;

    line-height: 1.5;

    span {
      color: #f9ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Avatar = styled.div<AvatarProps>`
  width: 56px;
  height: 56px;

  ${props =>
    props.url
      ? css`
          background: url(${props.url}) no-repeat 50% 50%;
          background-size: cover;

          svg {
            display: none;
          }
        `
      : css`
          svg {
            width: 30px;
            height: 30px;
            color: #999591;
            margin-bottom: 3px;
          }
        `}

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: 1px solid #999591;
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    font-weight: 500;
    margin-top: 8px;
    color: #ff9000;

    span + span::before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 12px;
      background-color: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  > div {
    background-color: #3e3b47;
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 16px 24px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 80%;
      top: 10%;
      background-color: #ff9000;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        width: 22px;
        height: 22px;
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    display: block;
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    width: 70px;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;

    svg {
      width: 22px;
      height: 22px;
      color: #ff9000;
      margin-right: 8px;
    }
  }

  > div {
    flex: 1;
    background-color: #3e3b47;
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 16px 24px;
    margin-left: 24px;

    strong {
      font-size: 20px;
      margin-left: 24px;
      color: #fff;
    }
  }
`;

export const AppointmentUserAvatar = styled.div<AvatarProps>`
  width: 56px;
  height: 56px;

  ${props =>
    props.url &&
    css`
      background: url(${props.url}) no-repeat 50% 50%;
      background-size: cover;

      svg {
        display: none;
      }
    `}

  ${props =>
    props.svgSize
      ? css`
          border: 3px solid #ff9000;
          svg {
            width: ${props.svgSize}px;
            height: ${props.svgSize}px;
            color: #ff9000;
            margin-bottom: 3px;
          }
        `
      : css`
          border: 2px solid #ff9000;
          svg {
            width: 22px;
            height: 22px;
            color: #ff9000;
            margin-bottom: 3px;
          }
        `}

  ${props =>
    props.size &&
    css`
      width: ${props.size}px;
      height: ${props.size}px;
    `}

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
`;

export const Calendar = styled.div`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
