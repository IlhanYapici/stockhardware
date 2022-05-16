import { Flex, Grid, Heading } from '@chakra-ui/react';

import SearchBar from '../searchBar/searchBar';

const CpuPanel = () => {
  return (
    <Flex flexDirection="column">
      <SearchBar target="CPU" />
    </Flex>
  );
};

export default CpuPanel;
