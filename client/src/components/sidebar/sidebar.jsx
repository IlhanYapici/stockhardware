import { Flex, Stack, Button } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Sidebar = ({ setPanel }) => {
  return (
    <Flex
      flexDirection="column"
      position="absolute"
      w="200px"
      h="calc(100vh - 55px)"
      justifyContent="center"
    >
      <Button
        position="absolute"
        top="0"
        left="calc(100px - 80px)"
        w="160px"
        colorScheme="messenger"
        variant="ghost"
        leftIcon={<ChevronLeftIcon />}
      >
        <Link to="/">Back to Home</Link>
      </Button>
      <Stack
        w="100px"
        h="250px"
        justifyContent="space-around"
        alignSelf="center"
      >
        <Button onClick={useEffect(() => setPanel('users'))} variant="ghost">
          Users
        </Button>
        <Button onClick={useEffect(() => setPanel('gpu'))} variant="ghost">
          GPU
        </Button>
        <Button onClick={useEffect(() => setPanel('cpu'))} variant="ghost">
          CPU
        </Button>
      </Stack>
    </Flex>
  );
};

export default Sidebar;
