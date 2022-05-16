import {
  Flex,
  Grid,
  Heading,
  Divider,
  Text,
  Badge,
  Button,
  HStack,
  LinkBox,
  LinkOverlay,
  Skeleton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CpuCard = ({ hasLoaded, cpu, key }) => {
  const editItem = (item) => {
    navigate(`edit/${item._id}`);
  };

  const setColorScheme = (brand) => {
    switch (brand.toLowerCase()) {
      case "intel":
        return "linkedin";
      case "amd":
        return "red";
      default:
        return "gray";
    }
  };

  const filteredData = Object.entries(cpu).filter(([key]) =>
    ["architecture", "socket", "freq_idle", "cores", "price"].includes(key)
  );

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  return (
    <Flex
      key={key}
      position="relative"
      flexDirection="column"
      bg="rgba(23, 25, 35, 0.75)"
      padding="10px 15px"
      borderRadius="md"
    >
      <Button
        zIndex="2"
        position="absolute"
        right="10px"
        top="10px"
        onClick={() => editItem(cpu)}
        variant="ghost"
        colorScheme="orange"
        rightIcon={<EditIcon />}
        size="xs"
        w="60px"
        marginLeft="auto"
      >
        Edit
      </Button>
      <LinkBox>
        <LinkOverlay
          zIndex="1"
          onClick={() => navigate(cpu._id)}
          _hover={{ cursor: "pointer" }}
        >
          <Grid templateColumns="max-content 1fr" gap="5rem">
            <HStack>
              <Skeleton isLoaded={hasLoaded}>
                <Heading key={key + ".name"} size="sm">
                  {cpu.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={hasLoaded}>
                <Badge
                  key={key + ".badge"}
                  mb="3px !important"
                  textAlign="center"
                  fontSize="x-small"
                  w="fit-content"
                  h="fit-content"
                  p="2px 7.5px"
                  verticalAlign="middle"
                  colorScheme={setColorScheme(cpu.brand)}
                >
                  {cpu.brand}
                </Badge>
              </Skeleton>
            </HStack>
          </Grid>
          <Divider marginTop="5px" />
          <Grid templateRows="repeat(3, auto)" gap="1rem" marginTop="1.5rem">
            {Object.entries(filteredData).map(([i, value]) => {
              return (
                <Skeleton isLoaded={hasLoaded} key={i}>
                  <Flex
                    gap="10px"
                    h="24px"
                    lineHeight="24px"
                    alignItems="center"
                    width="fit-content"
                  >
                    <Text>{value}</Text>
                  </Flex>
                </Skeleton>
              );
            })}
          </Grid>
        </LinkOverlay>
      </LinkBox>
    </Flex>
  );
};

export default CpuCard;
