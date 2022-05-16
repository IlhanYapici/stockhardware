import {
  Grid,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ setInput, target, marginBottom }) => {
  const navigate = useNavigate();

  return (
    <Grid
      templateColumns="1fr 100px 10px"
      gap="5rem"
      marginBottom={marginBottom}
      w="100%"
    >
      <InputGroup>
        <InputLeftElement children={<SearchIcon />} />
        <Input
          onChange={e => setInput(e.target.value.toLowerCase())}
          placeholder={`Search a ${target} by name`}
          type="search"
        />
      </InputGroup>
      <Button
        onClick={() => navigate('add')}
        size="sm"
        w="100px"
        colorScheme="green"
        rightIcon={<AddIcon />}
      >
        Add {target}
      </Button>
    </Grid>
  );
};

export default SearchBar;
