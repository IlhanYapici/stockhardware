import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const UserPanel = () => (
  <Flex w="100%">
    <Outlet />
  </Flex>
);

export default UserPanel;
