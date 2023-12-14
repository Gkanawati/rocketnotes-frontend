import styled from 'styled-components';

export const Container = styled.button `
  background: none;
  border: none;
  font-size: 16;
  color: ${({theme, $isactive}) => $isactive === 'true' ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
  text-transform: capitalize;
`;