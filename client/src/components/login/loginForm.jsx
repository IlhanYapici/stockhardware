import {
  Flex,
  Box,
  Text,
  Link,
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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MoltenMetal from "../background/animated.background";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    setError(false);
    setIsLoading(true);

    const url = "http://10.0.0.3:5000/login";

    await axios
      .post(
        url,
        {
          email,
          password,
        },
        config
      )
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.status);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Flex bg="rgba(237, 242, 247, 0.1)" borderRadius={10}>
        <Box p={4}>
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          {error && (
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              <AlertTitle>
                {error === 404 ? "User not found" : "Wrong password"}.
              </AlertTitle>
            </Alert>
          )}
          <Box my={4} textAlign="center">
            <form onSubmit={loginHandler}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="example@xyz.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
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
          <Text>
            You don't have an account yet ? <Link to="/signin">Sign in</Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default LoginForm;
