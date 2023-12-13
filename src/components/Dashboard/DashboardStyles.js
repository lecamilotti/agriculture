import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* Add your styles */
`;

const Header = styled.div`
  /* Header styles */
`;

const Sidebar = styled.div`
  /* Sidebar styles */
`;

const FormBox = styled.form`
  /* Form box styles */
`;

const ChartContainer = styled.div`
  svg {
    width: 100%;
    height: 400px;
  }
  /* Add more chart container styles as needed */
`;

export { Container, Header, Sidebar, FormBox, ChartContainer };
