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
import {
  EmailIcon,
  PhoneIcon,
  InfoOutlineIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const UserCard = ({ hasLoaded, user, parentKey }) => {
  const navigate = useNavigate();

  const editUser = () => {
    navigate(`edit/${user._id}`);
  };

  return (
    <Flex
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
        onClick={() => editUser()}
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
          onClick={() => navigate(user._id)}
          _hover={{ cursor: "pointer" }}
        >
          <Grid templateColumns="max-content 1fr" gap="5rem">
            <HStack>
              <Skeleton isLoaded={hasLoaded}>
                <Heading key={parentKey + ".fullname"} size="sm">
                  {user.firstname + " " + user.lastname}
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
                  colorScheme={user.isAdmin ? "red" : "linkedin"}
                >
                  {user.isAdmin ? "admin" : "user"}
                </Badge>
              </Skeleton>
            </HStack>
          </Grid>
          <Divider marginTop="5px" />
          <Grid templateRows="repeat(3, auto)" gap="1rem" marginTop="1.5rem">
            <Skeleton isLoaded={hasLoaded}>
              <Flex
                gap="10px"
                h="24px"
                lineHeight="24px"
                alignItems="center"
                width="fit-content"
              >
                <EmailIcon />
                <Text>{user.email}</Text>
              </Flex>
            </Skeleton>
            <Skeleton isLoaded={hasLoaded}>
              <Flex
                gap="10px"
                h="24px"
                lineHeight="24px"
                alignItems="center"
                width="fit-content"
              >
                <PhoneIcon /> <Text>{user.phone}</Text>
              </Flex>
            </Skeleton>
            <Skeleton isLoaded={hasLoaded}>
              <Flex
                gap="10px"
                h="24px"
                lineHeight="24px"
                alignItems="center"
                width="fit-content"
              >
                <InfoOutlineIcon />
                <Text>
                  {user.address + ", " + user.city + " " + user.postalcode}
                </Text>
              </Flex>
            </Skeleton>
          </Grid>
        </LinkOverlay>
      </LinkBox>
    </Flex>
  );
};

export default UserCard;
