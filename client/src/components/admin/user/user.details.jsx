import {
  Grid,
  Flex,
  Heading,
  Skeleton,
  HStack,
  Badge,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Dock from "../dock/dock";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setHasFetched(false);

      const { user } = JSON.parse(localStorage.getItem("userInfo"));
      const bearer = `Bearer ${user}`;

      const url = `http://10.0.0.3:5000/users/${userId}`;

      await axios
        .get(url, {
          headers: { Authorization: bearer },
        })
        .then((res) => {
          setUser(res.data);
          setHasFetched(true);
        })
        .catch((err) => {
          console.log(err);
          setHasFetched(false);
        });
    };

    if (localStorage.getItem("userInfo")) {
      getUser();
    }
  }, []);

  return (
    <>
      <Flex id="user__details" h="100%" w="100%" flexDirection="column">
        <Skeleton isLoaded={hasFetched}>
          <HStack>
            <Heading>{user.firstname + " " + user.lastname}</Heading>
            <Badge
              textAlign="center"
              mt="9px !important"
              fontSize="large"
              w="fit-content"
              h="fit-content"
              p="2px 7.5px"
              verticalAlign="middle"
              colorScheme={user.isAdmin ? "red" : "linkedin"}
            >
              {user.isAdmin ? "admin" : "user"}
            </Badge>
          </HStack>
          <Divider w="100%" mt="5px" />
        </Skeleton>
        <Grid>
          <Skeleton isLoaded={hasFetched}>
            <Text>
              <Text as="i">id :</Text> {user._id}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={hasFetched}>
            <Text>
              <Text as="i">Email :</Text> {user.email}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={hasFetched}>
            <Text>
              <Text as="i">Phone :</Text> {user.phone}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={hasFetched}>
            <Text>
              <Text as="i">Address :</Text> {user.address}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={hasFetched}>
            <Text>
              <Text as="i">City :</Text> {user.city}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={hasFetched}>
            <Text>
              <Text as="i">Postal code :</Text> {user.postalcode}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={hasFetched}>
            <Text>
              <Text as="i">Country :</Text> {user.country}
            </Text>
          </Skeleton>
        </Grid>
        <Dock tab="users" btn={false} />
      </Flex>
    </>
  );
};

export default UserDetails;
