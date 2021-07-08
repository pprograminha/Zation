import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  border-radius: 10px;
  margin-top: 10px;

  padding: 10px 20px;

  font-weight: bold;
  color: #eef;
  background-color: ${shade(0.17, '#111316')};
`;
