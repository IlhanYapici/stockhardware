import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const MainPage = () => {
  return (
    <Flex justifyContent="center">
      <Outlet />
    </Flex>
  );
};

export default MainPage;
