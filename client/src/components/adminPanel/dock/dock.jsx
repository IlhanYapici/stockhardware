import { Grid, Button, Center } from '@chakra-ui/react';
import { ChevronLeftIcon, DownloadIcon, AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Dock = ({ isLoading, submit, tab, btn, btnText }) => {
  const navigate = useNavigate();

  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

  const setBtn = () => {
    if (!btn) return <></>;
    return isLoading ? (
      <Button
        isLoading
        colorScheme="green"
        onClick={() => submit()}
        rightIcon={btnText === 'add' ? <AddIcon /> : <DownloadIcon />}
      >
        {capitalize(btnText)}
      </Button>
    ) : (
      <Button
        type="submit"
        w="150px"
        colorScheme="green"
        onClick={e => submit(e)}
        rightIcon={btnText === 'add' ? <AddIcon /> : <DownloadIcon />}
      >
        {capitalize(btnText)}
      </Button>
    );
  };

  const setDock = () => {
    if (!btn)
      return (
        <Button
          w="fit-content"
          variant="ghost"
          colorScheme="messenger"
          onClick={() => navigate('../')}
          leftIcon={<ChevronLeftIcon />}
        >
          Back to {capitalize(tab)}
        </Button>
      );
    else
      return (
        <Grid
          position="fixed"
          bottom={0}
          m={5}
          w="fit-content"
          h="42.5px"
          zIndex="sticky"
          templateColumns="repeat(2, 1fr)"
          gap="5rem"
          justifyContent="space-around"
        >
          <Button
            w="fit-content"
            variant="ghost"
            colorScheme="messenger"
            onClick={() => navigate('../')}
            leftIcon={<ChevronLeftIcon />}
          >
            Back to {capitalize(tab)}
          </Button>
          {setBtn()}
        </Grid>
      );
  };

  return <Center id="admin__dock">{setDock()}</Center>;
};

export default Dock;
