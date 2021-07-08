import { shade, tint } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}
export const Container = styled.div<ContainerProps>`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${shade(0.17, '#111316')};
  > svg {
    top: 50%;
    transform: translateY(-50%);

    left: 20px;
    position: absolute;
  }

  > input {
    border: 10px solid #000;
    &:-webkit-autofill {
      -webkit-text-fill-color: #fff !important;
      box-shadow: inset 0 0 0 30px ${shade(0.17, '#111316')};
    }
    color: #eef;
    background-color: ${shade(0.17, '#111316')};
    border-width: 8px;
    border-style: solid;
    border-color: ${shade(0.17, '#111316')};
    padding: 10px;
    padding-left: 45px;
    &::placeholder {
      font-weight: bold;
      color: ${tint(0.1, '#111316')};
    }
  }
  span {
    pointer-events: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    margin-left: 10px;

    font-size: 12px;
    font-weight: bold;
    @media screen and (max-width: 600px) {
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    color: #f50057;
  }

  ${props =>
    props.isFilled &&
    css`
      > svg {
        color: ${tint(0.3, '#7B81FF')} !important;
      }
    `}
  ${props =>
    props.isErrored &&
    css`
      > svg {
        color: #f50057 !important;
      }
      > input {
        &::placeholder {
          color: #f50057;
        }
      }
    `}
    ${props =>
    props.isFocused &&
    css`
      > svg {
        color: ${tint(0.3, '#7B81FF')} !important;
      }
      > input {
        &::placeholder {
          color: ${tint(0.3, '#7B81FF')};
        }
      }
    `}
`;
