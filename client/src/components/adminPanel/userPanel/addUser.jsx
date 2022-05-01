import {
  useToast,
  Flex,
  Grid,
  Heading,
  FormControl,
  FormLabel,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  Switch,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import axios from 'axios';

import Dock from '../dock/dock';

const AddUser = () => {
  const toast = useToast();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalcode] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const setToast = (title, message, status) => {
    return toast({
      title,
      description: message,
      status,
    });
  };

  const addUser = async e => {
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
        ? 'http://localhost:5000/users'
        : 'http://10.0.0.11:5000/users';

    await axios
      .post(
        url,
        {
          firstname,
          lastname,
          email,
          password,
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
        setToast('Success!', 'User created.', 'success');
      })
      .catch(err => {
        setError(err);
        setToast('Error!', error, 'error');
      });

    setIsLoading(false);
  };

  return (
    <Flex h="100%" w="100%" flexDirection="column">
      <Heading w="100%">Add user</Heading>
      <form onSubmit={addUser}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(5, 7rem)"
          columnGap="6rem"
          p="2rem"
        >
          <FormControl mt={4} isRequired>
            <FormLabel>First name</FormLabel>
            <Input type="text" onChange={e => setFirstname(e.target.value)} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Last name</FormLabel>
            <Input type="text" onChange={e => setLastname(e.target.value)} />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="example@xyz.com"
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                placeholder="********"
                onChange={e => setPassword(e.target.value)}
              />
              <InputRightElement w="3.5rem">
                <Button
                  variant="ghost"
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow(!show)}
                >
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              placeholder="0123456789"
              onChange={e => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Address</FormLabel>
            <Input type="text" onChange={e => setAddress(e.target.value)} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>City</FormLabel>
            <Input type="text" onChange={e => setCity(e.target.value)} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Postal code</FormLabel>
            <Input type="text" onChange={e => setPostalcode(e.target.value)} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Country</FormLabel>
            <Input type="text" onChange={e => setCountry(e.target.value)} />
          </FormControl>
          <FormControl
            mt={4}
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            <HStack>
              <FormLabel htmlFor="isAdmin">Admin</FormLabel>
              <Switch
                id="isAdmin"
                onChange={() => setIsAdmin(!isAdmin)}
                colorScheme="red"
              />
            </HStack>
          </FormControl>
        </Grid>
        <Dock
          isLoading={isLoading}
          submit={addUser}
          tab="users"
          btn={true}
          btnText="add"
        />
      </form>
    </Flex>
  );
};

export default AddUser;
