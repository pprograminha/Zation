import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';
import { shade, tint } from 'polished';
import signUpBackgroundImg from '../../static/sign-up-background.svg';

export const Container = styled.div`
  height: 100vh;
  background-color: #111316;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: 1000px) {
    justify-content: center;
  }
  position: relative;
  padding: 0 3%;
`;
export const Background = styled.div`
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.1;
  background-image: url('${signUpBackgroundImg}');
  background-position: center right;
  background-repeat: no-repeat;
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  flex: 1;
  max-width: 500px;
  h2 {
    text-align: left !important;
  }
  text-align: center;
  > a {
    display: inline-flex;
    align-items: center;

    font-weight: bold;
    margin-top: 50px;
    border-radius: 10px;
    transition: 300ms background-color ease-in-out;
    padding: 10px 20px;
    svg {
      margin-right: 10px;
    }
    &:hover {
      background-color: ${tint(0.01, '#111316')};
    }
  }
`;
export const FormContainer = styled.div`
  padding: 20px 20px;
  border: 3px solid ${tint(0.01, '#111316')};
  box-shadow: 0 0 10px ${shade(0.01, '#111316')};
  @media screen and (max-width: 600px) {
    padding: 30px 10px;
  }
  border-radius: 10px;
  background-color: ${tint(0.025, '#111316')};
  > h2 {
    margin-left: 5px;

    font-size: 25px;
    color: #f0f8ff;
  }
`;
export const Form = styled(UnForm)`
  margin-top: 20px;
  > div {
    margin-bottom: 8px;
  }
`;
export const SameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:nth-child(1) {
    div:nth-last-child(1) {
      margin-left: 10px;
    }
  }
  > a {
    font-weight: bold;
    font-size: 12px;
    color: #8f99ae;
    transition: 300ms opacity ease-in-out;
    &:hover {
      opacity: 0.5;
    }
  }
`;
