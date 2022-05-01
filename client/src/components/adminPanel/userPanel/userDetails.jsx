import { Flex, Heading, Skeleton, HStack, Badge } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Dock from '../dock/dock';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setHasFetched(false);

      const { user } = JSON.parse(localStorage.getItem('userInfo'));
      const bearer = `Bearer ${user}`;

      const url =
        document.location.hostname === 'localhost'
          ? `http://localhost:5000/users/${userId}`
          : `http://10.0.0.11:5000/users/${userId}`;

      const { data } = await axios.get(url, {
        headers: { Authorization: bearer },
      });

      setUser(data);
      setHasFetched(true);
    };

    if (localStorage.getItem('userInfo')) {
      getUser().catch(err => {
        console.error(err);
        setHasFetched(false);
      });
    }
  }, []);

  return (
    <>
      <Flex id="user__details" h="100%" w="100%" flexDirection="column">
        <Skeleton isLoaded={hasFetched}>
          <HStack>
            <Heading>{user.firstname + ' ' + user.lastname}</Heading>
            <Badge
              textAlign="center"
              mt="9px !important"
              fontSize="large"
              w="fit-content"
              h="fit-content"
              p="2px 7.5px"
              verticalAlign="middle"
              colorScheme={user.isAdmin ? 'red' : 'linkedin'}
            >
              {user.isAdmin ? 'admin' : 'user'}
            </Badge>
          </HStack>
        </Skeleton>
        <Dock tab="users" btn={false} />
      </Flex>
    </>
  );
};

export default UserDetails;
