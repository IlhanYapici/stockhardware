import { Flex, Grid, Heading } from '@chakra-ui/react';

import SearchBar from '../searchBar/searchBar';

const GpuPanel = () => {
  return (
    <Flex flexDirection="column">
      <SearchBar target="GPU" />
    </Flex>
  );
};

export default GpuPanel;
