import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalcode] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/');
    }
  }, [navigate]);

  const signupHandler = async e => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      setError(false);
      setIsLoading(true);

      const url =
        document.location.hostname === 'localhost'
          ? 'http://localhost:5000/users/add'
          : 'http://10.0.0.11:5000/users/add';

      await axios.post(
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
        },
        config
      );

      setIsLoading(false);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Flex>
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Sign up</Heading>
        </Box>
        {error && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            <AlertTitle>Credentials incorrect!</AlertTitle>
            <AlertDescription>{error}.</AlertDescription>
          </Alert>
        )}
        <Box my={4} textAlign="center">
          <form onSubmit={signupHandler}>
            <Flex>
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  type="text"
                  onChange={e => setFirstname(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  type="text"
                  onChange={e => setLastname(e.target.value)}
                />
              </FormControl>
            </Flex>
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
              <Input
                type="password"
                placeholder="********"
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Phone</FormLabel>
              <Input type="tel" onChange={e => setPhone(e.target.value)} />
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
              <Input
                type="text"
                onChange={e => setPostalcode(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Country</FormLabel>
              <Input type="text" onChange={e => setCountry(e.target.value)} />
            </FormControl>
            {isLoading ? (
              <Button isLoading width="full" mt={4} type="submit">
                Log In
              </Button>
            ) : (
              <Button width="full" mt={4} type="submit">
                Sign up
              </Button>
            )}
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignupForm;
