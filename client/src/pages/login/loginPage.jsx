import { Flex, Text } from "@chakra-ui/react";

import LoginForm from "../../components/login/loginForm";
import MoltenMetal from "../../components/background/animated.background";

const LoginPage = () => {
  return (
    <Flex
      id="login__page"
      h="100vh"
      w="100%"
      overflow="hidden"
      position="absolute"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <LoginForm />
      <MoltenMetal />
    </Flex>
  );
};

export default LoginPage;
