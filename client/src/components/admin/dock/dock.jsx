import { Box, Grid, Button, Center } from "@chakra-ui/react";
import { ChevronLeftIcon, DownloadIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Dock = ({ isLoading, submit, tab, btn, btnText }) => {
  const navigate = useNavigate();

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const setBtn = () => {
    return isLoading ? (
      <Button
        isLoading
        colorScheme="green"
        onClick={() => submit()}
        rightIcon={btnText === "add" ? <AddIcon /> : <DownloadIcon />}
        justifySelf="flex-start"
        ml="2rem"
      >
        {capitalize(btnText)}
      </Button>
    ) : (
      <Button
        type="submit"
        w="150px"
        colorScheme="green"
        onClick={(e) => submit(e)}
        rightIcon={btnText === "add" ? <AddIcon /> : <DownloadIcon />}
        justifySelf="flex-start"
        ml="2rem"
      >
        {capitalize(btnText)}
      </Button>
    );
  };

  const setDock = () => {
    if (!btn)
      return (
        <Box bg="gray.800">
          <Button
            w="fit-content"
            variant="ghost"
            colorScheme="messenger"
            onClick={() => navigate("../")}
            leftIcon={<ChevronLeftIcon />}
          >
            Back to {capitalize(tab)}
          </Button>
        </Box>
      );
    else
      return (
        <Grid
          position="fixed"
          bottom={0}
          p="10px"
          w="calc(100vw - 20px - 17px)"
          h="62.5px"
          left="0"
          zIndex="sticky"
          templateColumns="repeat(2, 1fr)"
          gap="5rem"
          justifyContent="space-around"
          bg="gray.800"
        >
          <Button
            w="fit-content"
            variant="ghost"
            colorScheme="messenger"
            onClick={() => navigate("../")}
            leftIcon={<ChevronLeftIcon />}
            justifySelf="flex-end"
            mr="2rem"
          >
            Back to {capitalize(tab)}
          </Button>
          {setBtn()}
        </Grid>
      );
  };

  return (
    <Center id="admin__dock" h="calc(42.5px + 20px)">
      {setDock()}
    </Center>
  );
};

export default Dock;
