import {
  Grid,
  Flex,
  useToast,
  Skeleton,
  Heading,
  Input,
  FormControl,
  FormLabel,
  HStack,
  Switch,
  toast,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Dock from '../dock/dock';

const EditUser = () => {
  const toast = useToast();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [postalcode, setPostalcode] = useState(null);
  const [country, setCountry] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const handleChange = (e, setter) => {
    if (e.target.value === '') {
      setter(user[e.target.name]);
    } else {
      setter(e.target.value);
    }
  };

  const setToast = (title, message, status) => {
    return toast({
      title,
      description: message,
      status,
    });
  };

  const updateUser = async e => {
    e.preventDefault();

    setError(false);
    setIsLoading(true);

    const { user } = JSON.parse(localStorage.getItem('userInfo'));
    const bearer = `Bearer ${user}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
    };

    const url =
      document.location.hostname === 'localhost'
        ? `http://localhost:5000/users/${userId}`
        : `http://10.0.0.11:5000/users/${userId}`;

    await axios
      .put(
        url,
        {
          firstname,
          lastname,
          email,
          phone,
          address,
          city,
          postalcode,
          country,
          isAdmin,
        },
        config
      )
      .then(() => {
        setToast('Success!', 'User updated.', 'success');
      })
      .catch(err => {
        setError(err);
        setToast('Error!', error, 'error');
      });

    setIsLoading(false);
  };

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
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
      setCity(data.city);
      setPostalcode(data.postalcode);
      setCountry(data.country);
      setIsAdmin(data.isAdmin);
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
      <Flex h="100%" w="calc(100vw - 200px - 17px)" flexDirection="column">
        <Skeleton isLoaded={hasFetched}>
          <Heading w="100%">
            {user.firstname + ' ' + user.lastname + ` (${userId})`}
          </Heading>
        </Skeleton>
        <form onSubmit={updateUser}>
          <Grid
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(5, 7rem)"
            columnGap="6rem"
            p="2rem"
          >
            <FormControl mt={4}>
              <FormLabel>Firstname :</FormLabel>
              <Skeleton isLoaded={hasFetched}>
                <Input
                  name="firstname"
                  onChange={e => handleChange(e, setFirstname)}
                  type="text"
                  placeholder={user.firstname}
                />
              </Skeleton>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Lastname :</FormLabel>
              <Skeleton isLoaded={hasFetched}>
                <Input
                  name="lastname"
                  onChange={e => handleChange(e, setLastname)}
                  type="text"
                  placeholder={user.lastname}
                />
              </Skeleton>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email :</FormLabel>
              <Skeleton isLoaded={hasFetched}>
                <Input
                  name="email"
                  onChange={e => handleChange(e, setEmail)}
                  type="email"
                  placeholder={user.email}
                />
              </Skeleton>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Phone :</FormLabel>
              <Skeleton isLoaded={hasFetched}>
                <Input
                  name="phone"
                  onChange={e => handleChange(e, setPhone)}
                  type="text"
                  placeholder={user.phone}
                />
              </Skeleton>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Address :</FormLabel>
              <Skeleton isLoaded={hasFetched}>
                <Input
                  name="address"
                  onChange={e => handleChange(e, setAddress)}
                  type="text"
                  placeholder={user.address}
                />
              </Skeleton>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Postal code :</FormLabel>
              <Skeleton isLoaded={hasFetched}>
                <Input
                  name="postalcode"
                  onChange={e => handleChange(e, setPostalcode)}
                  type="text"
                  placeholder={user.postalcode}
                />
              </Skeleton>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>City :</FormLabel>
              <Skeleton isLoaded={hasFetched}>
                <Input
                  name="city"
                  onChange={e => handleChange(e, setCity)}
                  type="text"
                  placeholder={user.city}
                />
              </Skeleton>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Country :</FormLabel>
              <Skeleton isLoaded={hasFetched}>
                <Input
                  name="country"
                  onChange={e => handleChange(e, setCountry)}
                  type="text"
                  placeholder={user.country}
                />
              </Skeleton>
            </FormControl>
            <FormControl mt={4}>
              <Skeleton
                isLoaded={hasFetched}
                display="flex"
                alignItems="center"
              >
                {isAdmin ? (
                  <HStack>
                    <FormLabel htmlFor="isAdmin">Admin :</FormLabel>
                    <Switch
                      id="isAdmin"
                      onChange={() => setIsAdmin(!isAdmin)}
                      colorScheme="red"
                      isChecked
                    />
                  </HStack>
                ) : (
                  <HStack>
                    <FormLabel htmlFor="isAdmin">Admin :</FormLabel>
                    <Switch
                      id="isAdmin"
                      onChange={() => setIsAdmin(!isAdmin)}
                      colorScheme="red"
                    />
                  </HStack>
                )}
              </Skeleton>
            </FormControl>
          </Grid>
          <Dock
            isLoading={isLoading}
            submit={updateUser}
            tab="users"
            btn={true}
            btnText="save"
          />
        </form>
      </Flex>
    </>
  );
};

export default EditUser;
