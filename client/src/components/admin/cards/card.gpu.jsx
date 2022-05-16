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
import { EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const GpuCard = ({ hasLoaded, gpu, parentKey }) => {
  const navigate = useNavigate();

  const editItem = (item) => {
    navigate(`edit/${item._id}`);
  };

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const setColorScheme = (brand) => {
    switch (brand.toLowerCase()) {
      case "nvidia":
        return "green";
      case "amd":
        return "red";
      default:
        return "gray";
    }
  };

  const filteredData = Object.fromEntries(
    Object.entries(gpu).filter(([key]) =>
      ["architecture", "bus", "mem_size", "mem_type", "price"].includes(key)
    )
  );

  return (
    <Flex
      key={parentKey}
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
        onClick={() => editItem(gpu)}
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
          onClick={() => navigate(gpu._id)}
          _hover={{ cursor: "pointer" }}
        >
          <Grid templateColumns="max-content 1fr" gap="5rem">
            <HStack>
              <Skeleton isLoaded={hasLoaded}>
                <Heading key={parentKey + ".name"} size="sm">
                  {gpu.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={hasLoaded}>
                <Badge
                  key={parentKey + ".badge"}
                  mb="3px !important"
                  textAlign="center"
                  fontSize="x-small"
                  w="fit-content"
                  h="fit-content"
                  p="2px 7.5px"
                  verticalAlign="middle"
                  colorScheme={setColorScheme(gpu.brand)}
                >
                  {gpu.brand}
                </Badge>
              </Skeleton>
            </HStack>
          </Grid>
          <Divider marginTop="5px" />
          <Grid templateRows="repeat(3, auto)" gap="1rem" marginTop="1.5rem">
            {Object.entries(filteredData).map(([i, value]) => {
              let unit = "";
              if (i === "mem_size") {
                unit = "GB";
              } else if (i === "price") {
                unit = "$";
              }
              return (
                <Skeleton isLoaded={hasLoaded} key={i}>
                  <Flex
                    gap="10px"
                    h="24px"
                    lineHeight="24px"
                    alignItems="center"
                    width="fit-content"
                  >
                    <Text>
                      {i.includes("mem")
                        ? `Memory ${i.split("_")[1]}`
                        : capitalize(i)}
                      : {value} {unit}
                    </Text>
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

export default GpuCard;
