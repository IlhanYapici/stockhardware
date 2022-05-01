import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/');
    }
  }, [navigate]);

  const loginHandler = async e => {
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
          ? 'http://localhost:5000/login'
          : 'http://10.0.0.11:5000/login';

      const { data } = await axios.post(
        url,
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      if (data) {
        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Flex>
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        {error && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            <AlertTitle>Credentials incorrect!</AlertTitle>
            <AlertDescription>{error}.</AlertDescription>
          </Alert>
        )}
        <Box my={4} textAlign="center">
          <form onSubmit={loginHandler}>
            <FormControl isRequired>
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
            {isLoading ? (
              <Button isLoading width="full" mt={4} type="submit">
                Log In
              </Button>
            ) : (
              <Button width="full" mt={4} type="submit">
                Log In
              </Button>
            )}
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginForm;
