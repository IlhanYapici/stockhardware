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
  HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";

import Dock from "../dock/dock";

const AddUser = () => {
  const toast = useToast();
  const [user, setUser] = useState({ isAdmin: false });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const setToast = (title, description, status) => {
    return toast({
      title,
      description,
      status,
    });
  };

  const defineUser = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();

    setError(false);
    setIsLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = "http://10.0.0.3:5000/users";

    await axios
      .post(url, user, config)
      .then(() => {
        setToast("Success!", "User created.", "success");
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
        setToast("OOPS!", error, "error");
      });
  };

  return (
    <Flex h="100%" w="100%" flexDirection="column">
      <Heading
        w="100%"
        position="sticky"
        mb="5px"
        top="42.5px"
        bgColor="gray.800"
        zIndex="sticky"
      >
        Add user
      </Heading>
      <form onSubmit={addUser}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(5, 7rem)"
          columnGap="6rem"
          p="2rem"
        >
          <FormControl mt={4} isRequired>
            <FormLabel>First name</FormLabel>
            <Input type="text" onChange={(e) => defineUser(e, "firstname")} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Last name</FormLabel>
            <Input type="text" onChange={(e) => defineUser(e, "lastname")} />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="example@xyz.com"
              onChange={(e) => defineUser(e, "email")}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="********"
                onChange={(e) => defineUser(e, "password")}
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
              onChange={(e) => defineUser(e, "phone")}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Address</FormLabel>
            <Input type="text" onChange={(e) => defineUser(e, "address")} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>City</FormLabel>
            <Input type="text" onChange={(e) => defineUser(e, "city")} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Postal code</FormLabel>
            <Input type="text" onChange={(e) => defineUser(e, "postalcode")} />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Country</FormLabel>
            <Input type="text" onChange={(e) => defineUser(e, "country")} />
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
                onChange={(e) => defineUser(e, "isAdmin")}
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
